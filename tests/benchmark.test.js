import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { median, calculateThroughputMbps, summarizeAttempts, validateTestUrl, measureEndpoint, csvCell, createCsvReport } from '../benchmark.js';
import { translations, translate } from '../i18n.js';

const endpoint = { name: 'Test CDN', url: 'https://cdn.example.com/file.bin' };
const hasCode = code => error => error.code === code;

test('median handles odd/even arrays without mutating input', () => {
  const values = [300, 100, 200];
  assert.equal(median(values), 200);
  assert.deepEqual(values, [300, 100, 200]);
  assert.equal(median([1, 4, 2, 3]), 2.5);
  assert.equal(median([]), null);
  assert.equal(median([NaN, Infinity, 20]), 20);
});

test('effective rate uses decoded bytes and complete elapsed time', () => {
  assert.equal(calculateThroughputMbps(1000000, 1000), 8);
  assert.equal(calculateThroughputMbps(1000, 0), 0);
});

test('summary excludes failures from medians and cancellations from attempts', () => {
  const result = summarizeAttempts([
    { status: 'ok', responseMs: 10, throughputMbps: 8, bytes: 100 },
    { status: 'error' },
    { status: 'ok', responseMs: 30, throughputMbps: 12, bytes: 200 },
    { status: 'cancelled' },
  ]);
  assert.deepEqual(result, { attemptedCount: 3, successCount: 2, responseMs: 20, throughputMbps: 10, decodedBytes: 300 });
  assert.equal(summarizeAttempts([{ status: 'error' }]).responseMs, null);
});

test('URL validation requires public HTTPS URLs without embedded credentials', () => {
  assert.equal(validateTestUrl(' https://cdn.example.com/test.bin#fragment '), endpoint.url.replace('file', 'test'));
  for (const url of ['not a URL', 'javascript:alert(1)', 'http://cdn.example.com/file', 'https://user:pass@cdn.example.com/file', 'https://localhost/file', 'https://192.168.1.10/file', 'https://127.1/file', 'https://10.1.0.1/file', 'https://172.20.0.1/file', 'https://host.local/file', 'https://[::1]/file']) {
    assert.throws(() => validateTestUrl(url));
  }
});

test('successful measurement streams bytes and applies privacy/cache options', async () => {
  let captured;
  let ticks = 0;
  const result = await measureEndpoint(endpoint, {
    now: () => [0, 20, 120][ticks++],
    fetchImpl: async (url, options) => {
      captured = { url, options };
      return new Response(new Uint8Array(120000), { headers: { 'content-type': 'application/octet-stream' } });
    },
  });
  assert.equal(result.bytes, 120000);
  assert.equal(result.responseMs, 20);
  assert.equal(result.totalMs, 120);
  assert.equal(result.throughputMbps, 8);
  assert.equal(captured.options.credentials, 'omit');
  assert.equal(captured.options.referrerPolicy, 'no-referrer');
  assert.equal(captured.options.mode, 'cors');
  assert.equal(captured.options.cache, 'no-store');
  assert.ok(new URL(captured.url).searchParams.has('__cdnbench'));
});

test('HTTP errors are reported rather than counted as successes', async () => {
  await assert.rejects(measureEndpoint(endpoint, { fetchImpl: async () => new Response('', { status: 404 }) }), hasCode('http'));
});

test('HTML error pages are not counted as file measurements', async () => {
  await assert.rejects(measureEndpoint(endpoint, { fetchImpl: async () => new Response('<html/>', { headers: { 'content-type': 'text/html' } }) }), hasCode('html'));
});

test('empty bodies are reported', async () => {
  await assert.rejects(measureEndpoint(endpoint, { fetchImpl: async () => new Response('') }), hasCode('empty'));
});

test('declared and streamed oversized files are rejected', async () => {
  await assert.rejects(measureEndpoint(endpoint, { maxBytes: 4, fetchImpl: async () => new Response('abcde', { headers: { 'content-length': '5' } }) }), hasCode('tooLarge'));
  await assert.rejects(measureEndpoint(endpoint, { maxBytes: 4, fetchImpl: async () => new Response('abcde') }), hasCode('tooLarge'));
});

test('network errors retain honest ambiguous error classification', async () => {
  await assert.rejects(measureEndpoint(endpoint, { fetchImpl: async () => { throw new TypeError('Failed to fetch'); } }), hasCode('network'));
});

test('timeouts abort the active request', async () => {
  await assert.rejects(measureEndpoint(endpoint, {
    timeoutMs: 5,
    fetchImpl: async (url, options) => new Promise((resolveRequest, rejectRequest) => {
      options.signal.addEventListener('abort', () => rejectRequest(new DOMException('Aborted', 'AbortError')), { once: true });
    }),
  }), hasCode('timeout'));
});

test('user cancellation is distinct from timeout', async () => {
  const controller = new AbortController();
  const measurement = measureEndpoint(endpoint, {
    signal: controller.signal,
    fetchImpl: async (url, options) => new Promise((resolveRequest, rejectRequest) => {
      options.signal.addEventListener('abort', () => rejectRequest(new DOMException('Aborted', 'AbortError')), { once: true });
    }),
  });
  controller.abort();
  await assert.rejects(measurement, hasCode('cancelled'));
  await assert.rejects(measureEndpoint(endpoint, { signal: controller.signal }), hasCode('cancelled'));
});

test('CSV escapes quotes and neutralizes spreadsheet formulas', () => {
  assert.equal(csvCell('quoted "name"'), '"quoted ""name"""');
  assert.equal(csvCell('=HYPERLINK("bad")'), '"\'=HYPERLINK(""bad"")"');
  assert.equal(csvCell('\tformula'), '"\'\tformula"');
  const report = createCsvReport([{ endpoint, attempts: [{ status: 'error', round: 1, errorCode: 'timeout' }, { status: 'cancelled', round: 2 }] }], '2026-10-13');
  assert.ok(report.startsWith('\uFEFF'));
  assert.match(report, /"timeout"/);
  assert.match(report, /"cancelled"/);
});

test('Chinese and English dictionaries cover the same UI keys', async () => {
  assert.deepEqual(Object.keys(translations.zh).sort(), Object.keys(translations.en).sort());
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  for (const match of html.matchAll(/data-i18n="([^"]+)"/g)) {
    assert.ok(translations.zh[match[1]], `Missing Chinese key: ${match[1]}`);
    assert.ok(translations.en[match[1]], `Missing English key: ${match[1]}`);
  }
  assert.equal(translate('en', 'testing', { name: 'CDN', round: 1, rounds: 3 }), 'Testing CDN · Request 1/3');
});
