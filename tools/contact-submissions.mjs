import { randomUUID } from 'node:crypto';
import { mkdir, open, readFile, rename, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

class SubmissionError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}

export function validateSubmission(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new SubmissionError(400, 'invalid');
  const result = {};
  for (const [key, max] of Object.entries({ title: 120, content: 6000, contact: 240 })) {
    const text = value[key];
    if (typeof text !== 'string' || !text.trim() || text.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) throw new SubmissionError(400, key);
    result[key] = text.trim();
  }
  if (!['zh', 'en'].includes(value.language)) throw new SubmissionError(400, 'invalid');
  if (typeof value.requestId !== 'string' || !/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value.requestId)) throw new SubmissionError(400, 'invalid');
  return { ...result, language: value.language, requestId: value.requestId };
}

// Separate from publishable editorial content: messages never enter site builds.
export class ContactSubmissionStore {
  constructor(rootDirectory) {
    this.directory = resolve(rootDirectory, '.admin');
    this.filename = resolve(this.directory, 'submissions.json');
    this.queue = Promise.resolve();
    this.rows = null;
  }
  async load() {
    if (this.rows) return;
    try {
      const saved = JSON.parse(await readFile(this.filename, 'utf8'));
      if (!Array.isArray(saved)) throw new Error('Invalid submissions storage');
      this.rows = saved;
    } catch (error) { if (error.code === 'ENOENT') this.rows = []; else throw error; }
  }
  run(operation) {
    const result = this.queue.then(async () => { await this.load(); return operation(); });
    this.queue = result.catch(() => {});
    return result;
  }
  add(input) {
    const value = validateSubmission(input);
    return this.run(async () => {
      const duplicate = this.rows.find(row => row.requestId === value.requestId);
      if (duplicate) {
        if (['title', 'content', 'contact', 'language'].some(key => duplicate[key] !== value[key])) throw new SubmissionError(409, 'conflict');
        return { id: duplicate.id, duplicate: true };
      }
      const row = { ...value, id: randomUUID(), createdAt: new Date().toISOString() };
      const next = [row, ...this.rows];
      await mkdir(this.directory, { recursive: true });
      const temporary = resolve(this.directory, 'submissions-' + randomUUID() + '.tmp');
      try {
        const handle = await open(temporary, 'wx', 0o600);
        try { await handle.writeFile(JSON.stringify(next, null, 2) + '\n'); await handle.sync(); }
        finally { await handle.close(); }
        await rename(temporary, this.filename);
        this.rows = next;
      } finally { await rm(temporary, { force: true }); }
      return { id: row.id, duplicate: false };
    });
  }
  list({ query = '', page = 1 } = {}) {
    return this.run(() => {
      const needle = String(query).slice(0, 240).trim().toLocaleLowerCase();
      const matches = this.rows.filter(row => [row.title, row.content, row.contact].some(text => text.toLocaleLowerCase().includes(needle)));
      const pageSize = 20;
      const pages = Math.max(1, Math.ceil(matches.length / pageSize));
      const current = Math.min(pages, Math.max(1, Math.floor(Number(page) || 1)));
      return { items: matches.slice((current - 1) * pageSize, current * pageSize).map(({ requestId, ...row }) => ({ ...row })), total: matches.length, page: current, pages, pageSize };
    });
  }
}

export function createContactApi({ submissions, origin = process.env.PUBLIC_ORIGIN ?? process.env.ADMIN_ORIGIN }) {
  const attempts = new Map();
  const windowMs = 10 * 60 * 1000;
  return async (request, response) => {
    const respond = (status, value, headers = {}) => {
      response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', ...headers });
      response.end(JSON.stringify(value));
    };
    try {
      if (request.method !== 'POST') { respond(405, { error: 'method' }, { Allow: 'POST' }); return; }
      const expectedOrigin = origin ?? `${request.socket.encrypted ? 'https' : 'http'}://${request.headers.host}`;
      if (request.headers.origin !== expectedOrigin || request.headers['sec-fetch-site'] === 'cross-site') throw new SubmissionError(403, 'origin');
      const now = Date.now();
      for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
      const address = request.socket.remoteAddress ?? 'unknown';
      // Forwarded client headers are not trusted unless a deployment adds a trusted proxy policy.
      const entry = attempts.get(address) ?? { count: 0, until: now + windowMs };
      if (entry.count >= 5 || (!attempts.has(address) && attempts.size >= 10000)) {
        respond(429, { error: 'rate_limit' }, { 'Retry-After': String(Math.max(1, Math.ceil((entry.until - now) / 1000))) }); return;
      }
      entry.count++; attempts.set(address, entry);
      if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? '')) throw new SubmissionError(415, 'format');
      const chunks = []; let size = 0;
      for await (const chunk of request) {
        size += chunk.length;
        if (size > 32768) throw new SubmissionError(413, 'size');
        chunks.push(chunk);
      }
      let value;
      try { value = JSON.parse(Buffer.concat(chunks).toString('utf8')); }
      catch { throw new SubmissionError(400, 'invalid'); }
      const result = await submissions.add(value);
      respond(result.duplicate ? 200 : 201, { ok: true });
    } catch (error) {
      respond(error instanceof SubmissionError ? error.status : 503, { error: error instanceof SubmissionError ? error.code : 'unavailable' });
    }
  };
}
