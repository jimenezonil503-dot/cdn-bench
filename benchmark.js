export const MAX_BYTES = 12 * 1024 * 1024;
export const DEFAULT_ENDPOINTS = Object.freeze([
  { id: 'jsdelivr', name: 'jsDelivr', logo: 'assets/logos/jsdelivr.svg', url: 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js', bytes: 1272972, icon: '↗', color: '#dc7658', background: '#fff0e8' },
  { id: 'unpkg', name: 'UNPKG', logo: 'assets/logos/unpkg.png', url: 'https://unpkg.com/three@0.160.0/build/three.module.js', bytes: 1272972, icon: '▧', color: '#647569', background: '#eaf0e9' },
  { id: 'cdnjs', name: 'cdnjs', logo: 'assets/logos/cdnjs.svg', url: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.module.js', bytes: 1272972, icon: '∞', color: '#d8a547', background: '#fff5de' },
  { id: 'bootcdn', name: 'BootCDN', logo: 'assets/logos/bootcdn.png', url: 'https://cdn.bootcdn.net/ajax/libs/three.js/0.160.0/three.module.js', bytes: 1272972, icon: 'B', color: '#638ba0', background: '#eaf3f7' },
]);

export class BenchmarkError extends Error {
  constructor(code, detail = '') {
    super(detail || code);
    this.name = 'BenchmarkError';
    this.code = code;
    this.detail = detail;
  }
}

export function validateTestUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) throw new BenchmarkError('invalidUrl');
  let parsed;
  try {
    parsed = new URL(value.trim());
  } catch {
    throw new BenchmarkError('invalidUrl');
  }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) throw new BenchmarkError('invalidUrl');
  const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  const privateIpv4 = /^(?:0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.)/;
  if (host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') || !host.includes('.') || privateIpv4.test(host) || host.includes(':')) {
    throw new BenchmarkError('publicUrlRequired');
  }
  parsed.hash = '';
  return parsed.href;
}

export function median(values) {
  const sorted = values.filter(Number.isFinite).slice().sort((first, second) => first - second);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function calculateThroughputMbps(bytes, elapsedMs) {
  return bytes > 0 && elapsedMs > 0 ? bytes * 8 / (elapsedMs * 1000) : 0;
}

export function summarizeAttempts(attempts) {
  const completed = attempts.filter(attempt => attempt.status !== 'cancelled');
  const successes = completed.filter(attempt => attempt.status === 'ok');
  return {
    attemptedCount: completed.length,
    successCount: successes.length,
    responseMs: median(successes.map(attempt => attempt.responseMs)),
    throughputMbps: median(successes.map(attempt => attempt.throughputMbps)),
    decodedBytes: successes.reduce((total, attempt) => total + attempt.bytes, 0),
  };
}

export async function measureEndpoint(endpoint, options = {}) {
  const { signal, timeoutMs = 15000, maxBytes = MAX_BYTES, fetchImpl = globalThis.fetch, now = () => performance.now() } = options;
  if (signal?.aborted) throw new BenchmarkError('cancelled');
  const url = new URL(validateTestUrl(endpoint.url));
  url.searchParams.set('__cdnbench', `${Date.now()}-${globalThis.crypto.randomUUID()}`);
  const controller = new AbortController();
  let timedOut = false;
  let reader;
  const onAbort = () => controller.abort();
  signal?.addEventListener('abort', onAbort, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const started = now();
  try {
    const response = await fetchImpl(url.href, {
      mode: 'cors', credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer', signal: controller.signal,
    });
    const responseMs = Math.max(0, now() - started);
    if (controller.signal.aborted) throw new BenchmarkError(timedOut ? 'timeout' : 'cancelled');
    if (!response.ok) throw new BenchmarkError('http', String(response.status));
    if (response.url && new URL(response.url).protocol !== 'https:') throw new BenchmarkError('invalidUrl');
    if (/text\/html|application\/xhtml/i.test(response.headers.get('content-type') ?? '')) throw new BenchmarkError('html');
    const declaredBytes = Number(response.headers.get('content-length'));
    if (declaredBytes > maxBytes) throw new BenchmarkError('tooLarge');
    if (!response.body) throw new BenchmarkError('empty');
    reader = response.body.getReader();
    let bytes = 0;
    while (true) {
      const chunk = await reader.read();
      if (controller.signal.aborted) throw new BenchmarkError(timedOut ? 'timeout' : 'cancelled');
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > maxBytes) throw new BenchmarkError('tooLarge');
    }
    if (!bytes) throw new BenchmarkError('empty');
    const totalMs = Math.max(0.01, now() - started);
    return { status: 'ok', responseMs, totalMs, bytes, throughputMbps: calculateThroughputMbps(bytes, totalMs) };
  } catch (error) {
    controller.abort();
    if (signal?.aborted) throw new BenchmarkError('cancelled');
    if (timedOut) throw new BenchmarkError('timeout');
    if (error instanceof BenchmarkError) throw error;
    throw new BenchmarkError('network');
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener('abort', onAbort);
    if (reader) {
      try { await reader.cancel(); } catch {}
      reader.releaseLock();
    }
  }
}

export function csvCell(value) {
  let text = String(value ?? '');
  if (/^\s*[=+\-@]/.test(text) || /^[\t\r\n]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function createCsvReport(records, startedAt) {
  const rows = [['run_started_at', 'cdn_name', 'test_url', 'round', 'status', 'response_ms', 'complete_request_ms', 'decoded_body_bytes', 'effective_decoded_mbps', 'error_code', 'error_detail']];
  for (const record of records) {
    for (const attempt of record.attempts) {
      rows.push([
        startedAt, record.endpoint.name, record.endpoint.url, attempt.round, attempt.status,
        attempt.responseMs?.toFixed(2) ?? '', attempt.totalMs?.toFixed(2) ?? '', attempt.bytes ?? '',
        attempt.throughputMbps?.toFixed(4) ?? '', attempt.errorCode ?? '', attempt.detail ?? '',
      ]);
    }
  }
  return '\uFEFF' + rows.map(row => row.map(csvCell).join(',')).join('\r\n');
}
