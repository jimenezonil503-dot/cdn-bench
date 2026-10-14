import { randomBytes, timingSafeEqual } from 'node:crypto';
import { loadCredentials, verifyCredentials } from './admin-auth.mjs';
import { AdminError } from './admin-content.mjs';
import { adCodeDocument } from './advertising.mjs';
import { uploadAdImage, readAdImage } from './ad-upload.mjs';

const cookieName = 'cdn_admin_session';
const sessionLifetime = 8 * 60 * 60 * 1000;
const attemptWindow = 15 * 60 * 1000;

function respond(response, status, value, headers = {}) {
  const body = JSON.stringify(value);
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'X-Robots-Tag': 'noindex, nofollow', ...headers });
  response.end(body);
}

function sessionToken(request) {
  return (request.headers.cookie ?? '').split(';').map(item => item.trim()).find(item => item.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1) ?? '';
}

async function readJson(request, limit = 2 * 1024 * 1024) {
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers['content-type'] ?? '')) throw new AdminError(415, '请求必须使用 JSON 格式。');
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > limit) throw new AdminError(413, '内容超过上传限制，请缩减后重试。');
    chunks.push(chunk);
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid body');
    return value;
  } catch { throw new AdminError(400, 'JSON 数据格式无效。'); }
}

function equalToken(actual, expected) {
  if (typeof actual !== 'string' || actual.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}

export function createAdminApi({ rootDirectory, store, submissions, credentials, secureCookie = process.env.ADMIN_SECURE_COOKIE === 'true', origin = process.env.ADMIN_ORIGIN }) {
  const loadedCredentials = credentials === undefined ? loadCredentials(rootDirectory) : Promise.resolve(credentials);
  const sessions = new Map();
  const attempts = new Map();
  const cookie = (token, lifetime = sessionLifetime) => `${cookieName}=${token}; Path=/admin/; HttpOnly; SameSite=Strict; Max-Age=${Math.floor(lifetime / 1000)}${secureCookie ? '; Secure' : ''}`;

  return async (request, response, pathname) => {
    const now = Date.now();
    for (const [token, session] of sessions) if (session.expires <= now) sessions.delete(token);
    for (const [address, attempt] of attempts) if (attempt.expires <= now) attempts.delete(address);
    try {
      const configured = await loadedCredentials;
      const token = sessionToken(request);
      const session = sessions.get(token);
      if (pathname === '/admin/api/session' && request.method === 'GET') {
        respond(response, 200, session ? { authenticated: true, username: session.username, csrfToken: session.csrf, expiresAt: new Date(session.expires).toISOString() } : { authenticated: false, configured: Boolean(configured) });
        return;
      }
      if (!['GET', 'POST', 'PUT'].includes(request.method)) throw new AdminError(405, '不支持此请求方式。');
      if (request.method !== 'GET') {
        const expectedOrigin = origin ?? `${request.socket.encrypted ? 'https' : 'http'}://${request.headers.host}`;
        if (request.headers.origin !== expectedOrigin || request.headers['sec-fetch-site'] === 'cross-site') throw new AdminError(403, '已拒绝跨站请求。');
      }
      if (pathname === '/admin/api/login' && request.method === 'POST') {
        if (!configured) throw new AdminError(503, '管理员账号尚未配置，请先在服务器创建管理员凭据。');
        const address = request.socket.remoteAddress ?? 'unknown';
        const attempt = attempts.get(address) ?? { failures: 0, expires: now + attemptWindow };
        if (attempt.failures >= 5) {
          respond(response, 429, { error: '登录失败次数过多，请 15 分钟后再试。' }, { 'Retry-After': String(Math.ceil((attempt.expires - now) / 1000)) });
          return;
        }
        const body = await readJson(request);
        if (!await verifyCredentials(configured, body.username, body.password)) {
          attempt.failures += 1;
          if (attempts.size >= 2000) attempts.delete(attempts.keys().next().value);
          attempts.set(address, attempt);
          throw new AdminError(401, '账号或密码错误。');
        }
        attempts.delete(address);
        sessions.delete(token);
        if (sessions.size >= 100) sessions.delete(sessions.keys().next().value);
        const newToken = randomBytes(32).toString('hex');
        const newSession = { username: configured.username, csrf: randomBytes(32).toString('hex'), expires: now + sessionLifetime };
        sessions.set(newToken, newSession);
        respond(response, 200, { authenticated: true, username: newSession.username, csrfToken: newSession.csrf }, { 'Set-Cookie': cookie(newToken) });
        return;
      }
      if (!session) throw new AdminError(401, '请先以管理员账号登录。');
      if (request.method !== 'GET' && !equalToken(request.headers['x-csrf-token'], session.csrf)) throw new AdminError(403, '会话校验失败，请重新登录。');
      if (pathname === '/admin/api/logout' && request.method === 'POST') {
        sessions.delete(token);
        respond(response, 200, { authenticated: false }, { 'Set-Cookie': cookie('', 0) });
      } else if (pathname === '/admin/api/ad-upload' && request.method === 'POST') {
        respond(response, 200, await uploadAdImage(rootDirectory, (await readJson(request, 8 * 1024 * 1024)).data));
      } else if (pathname.startsWith('/admin/api/ad-image/') && request.method === 'GET') {
        const image = await readAdImage(rootDirectory, pathname.slice('/admin/api/ad-image/'.length));
        response.writeHead(200, { 'Content-Type': image.type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex' });
        response.end(image.bytes);
      } else if (pathname === '/admin/api/ad-preview' && request.method === 'POST') {
        const { code } = await readJson(request);
        if (typeof code !== 'string' || !code.trim() || code.length > 100000) throw new AdminError(400, '请填写广告代码，最多 100000 字符。');
        session.preview = { token: randomBytes(24).toString('hex'), code };
        respond(response, 200, { url: './api/ad-preview/' + session.preview.token });
      } else if (pathname.startsWith('/admin/api/ad-preview/') && request.method === 'GET') {
        if (!session.preview || pathname !== '/admin/api/ad-preview/' + session.preview.token) throw new AdminError(404, '预览已失效，请重新生成。');
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow', 'Referrer-Policy': 'no-referrer',
          'Content-Security-Policy': "sandbox allow-scripts allow-popups allow-popups-to-escape-sandbox; frame-ancestors 'self'; default-src https: data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src https:; form-action 'none'; base-uri 'none'" });
        response.end(adCodeDocument(session.preview.code));
      } else if (pathname === '/admin/api/submissions' && request.method === 'GET') {
        const params = new URL(request.url, 'http://localhost').searchParams;
        respond(response, 200, await submissions.list({ query: params.get('q') ?? '', page: params.get('page') ?? 1 }));
      } else if (pathname === '/admin/api/data' && request.method === 'GET') {
        respond(response, 200, await store.getData());
      } else if (pathname === '/admin/api/data' && request.method === 'PUT') {
        respond(response, 200, await store.save(await readJson(request, 4 * 1024 * 1024)));
      } else if (pathname === '/admin/api/publish' && request.method === 'POST') {
        respond(response, 200, await store.publish((await readJson(request)).revision));
      } else throw new AdminError(404, '后台接口不存在。');
    } catch (error) {
      if (!(error instanceof AdminError)) console.error('Admin request failed:', error.message);
      respond(response, error.status ?? 500, { error: error instanceof AdminError ? error.message : '后台暂时不可用，请检查服务器配置。' });
    }
  };
}
