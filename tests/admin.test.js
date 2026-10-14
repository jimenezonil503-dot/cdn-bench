import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES, PROVIDERS } from '../content.js';
import { createPreviewServer } from '../tools/serve.mjs';
import { createCredentials, verifyCredentials } from '../tools/admin-auth.mjs';
import { publicContent, seedContent, validateContent, validSlug } from '../tools/admin-content.mjs';
import { AdminStore } from '../tools/admin-store.mjs';
import { buildPages } from '../tools/build-pages.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const workRoot = fileURLToPath(new URL('../../../work/admin-checks/', import.meta.url));
const fixtures = [];
const password = 'test-only-admin-passphrase';
let credentials;
let baseline;

async function fixture() {
  const directory = await mkdtemp(resolve(workRoot, 'fixture-'));
  fixtures.push(directory);
  for (const path of ['tools', 'admin', 'assets', 'editorial', 'content.js', 'platform.js', 'article-links.js', 'seo-content.js', 'i18n.js', 'benchmark.js', 'app.js', 'styles.css', 'platform.css', 'platform-overrides.css', 'homepage.css', 'rankings.css', 'provider-page.css', 'navigation.css', 'contact.css', 'contact-submit.js', 'site-shell.js', 'advertising.js', 'advertising.css', 'site-settings.js', 'favicon.svg', 'package.json']) {
    await cp(resolve(root, path), resolve(directory, path), { recursive: true });
  }
  const { writeFile } = await import('node:fs/promises');
  await writeFile(resolve(directory, 'admin-overrides.js'), 'export const providerOverrides = null;\nexport const articleOverrides = null;\n');
  await buildPages({ outputRoot: directory, siteUrl: '' });
  return directory;
}

before(async () => {
  await mkdir(workRoot, { recursive: true });
  credentials = await createCredentials('test-admin', password);
  baseline = await fixture();
});

after(async () => {
  for (const directory of fixtures) {
    assert.equal(dirname(resolve(directory)), resolve(workRoot));
    await rm(directory, { recursive: true, force: true });
  }
});

async function client(context, options = {}) {
  const server = createPreviewServer({ rootDirectory: baseline, adminCredentials: credentials, ...options });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  context.after(() => new Promise(done => server.close(done)));
  const origin = 'http://127.0.0.1:' + server.address().port;
  let cookie = '';
  let csrf = '';
  const request = async (path, { method = 'GET', value, headers = {}, authenticated = true } = {}) => {
    const response = await fetch(origin + path, {
      method,
      headers: { ...(value !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(method !== 'GET' && method !== 'HEAD' ? { Origin: origin } : {}), ...(authenticated ? { Cookie: cookie, 'X-CSRF-Token': csrf } : {}), ...headers },
      body: value === undefined ? undefined : JSON.stringify(value),
    });
    const text = await response.text();
    let body;
    try { body = JSON.parse(text); } catch { body = text; }
    return { response, body, status: response.status };
  };
  const login = async () => {
    const result = await request('/admin/api/login', { method: 'POST', value: { username: 'test-admin', password } });
    assert.equal(result.status, 200);
    cookie = result.response.headers.get('set-cookie').split(';')[0];
    csrf = result.body.csrfToken;
    return result;
  };
  return { origin, request, login };
}

test('administrator credentials use salted hashes and verify only the configured identity', async () => {
  const alternate = await createCredentials('test-admin', password);
  assert.notEqual(credentials.salt, alternate.salt);
  assert.notEqual(credentials.hash, alternate.hash);
  assert.equal(JSON.stringify(credentials).includes(password), false);
  assert.equal(await verifyCredentials(credentials, 'test-admin', password), true);
  assert.equal(await verifyCredentials(credentials, 'other-user', password), false);
  assert.equal(await verifyCredentials(credentials, 'test-admin', 'incorrect'), false);
  await assert.rejects(createCredentials('test-admin', 'short'));
});

test('admin content validates URLs, identifiers, bilingual fallback, and private drafts', () => {
  const data = seedContent(PROVIDERS, ARTICLES);
  data.articles[0].status = 'draft';
  data.providers[0].intro.en = '';
  const validated = validateContent(data);
  assert.equal(validated.providers[0].intro.en, data.providers[0].intro.zh);
  assert.equal(publicContent(validated).articles.length, ARTICLES.length - 1);
  for (const invalid of ['../escape', 'con', 'index', 'unsafe/id', 'Uppercase', 'nul']) assert.equal(validSlug(invalid), false);
  assert.equal(validSlug('edge-network-2'), true);
  const duplicate = structuredClone(data);
  duplicate.providers.push(duplicate.providers[0]);
  assert.throws(() => validateContent(duplicate), { status: 400 });
  data.providers[0].officialUrl = 'javascript:alert(1)';
  assert.throws(() => validateContent(data), { status: 400 });
});

test('anonymous users cannot read, save, or publish admin data', async context => {
  const app = await client(context);
  assert.deepEqual((await app.request('/admin/api/session')).body, { authenticated: false, configured: true });
  for (const [path, method] of [['data', 'GET'], ['data', 'PUT'], ['publish', 'POST']]) {
    assert.equal((await app.request('/admin/api/' + path, { method, value: method === 'GET' ? undefined : {} })).status, 401);
  }
});

test('login sets a private cookie, exposes only authorized data, and logout invalidates the session', async context => {
  const app = await client(context);
  assert.equal((await app.request('/admin/api/login', { method: 'POST', value: { username: 'test-admin', password: 'incorrect' } })).status, 401);
  const login = await app.login();
  const cookie = login.response.headers.get('set-cookie');
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Strict/);
  assert.match(cookie, /Path=\/admin\//);
  assert.match(login.body.csrfToken, /^[a-f0-9]{64}$/);
  assert.equal((await app.request('/admin/api/session')).body.authenticated, true);
  const data = await app.request('/admin/api/data');
  assert.equal(data.status, 200);
  assert.equal(data.body.providers.length, PROVIDERS.length);
  assert.equal(data.body.articles.length, ARTICLES.length);
  assert.equal(JSON.stringify(data.body).includes(credentials.hash), false);
  assert.equal((await app.request('/admin/api/logout', { method: 'POST', value: {} })).status, 200);
  assert.equal((await app.request('/admin/api/data')).status, 401);
  assert.equal((await app.request('/admin/api/session')).body.authenticated, false);
});

test('admin mutations reject missing CSRF tokens and cross-site origins', async context => {
  const app = await client(context);
  await app.login();
  for (const token of ['', 'wrong']) assert.equal((await app.request('/admin/api/data', { method: 'PUT', value: {}, headers: { 'X-CSRF-Token': token } })).status, 403);
  assert.equal((await app.request('/admin/api/publish', { method: 'POST', value: {}, headers: { Origin: 'https://untrusted.example' } })).status, 403);
  assert.equal((await app.request('/admin/api/publish', { method: 'POST', value: {}, headers: { 'Sec-Fetch-Site': 'cross-site' } })).status, 403);
});

test('repeated invalid logins are rate limited', async context => {
  const app = await client(context);
  for (let attempt = 0; attempt < 5; attempt++) assert.equal((await app.request('/admin/api/login', { method: 'POST', value: { username: 'test-admin', password: 'incorrect' } })).status, 401);
  const limited = await app.request('/admin/api/login', { method: 'POST', value: { username: 'test-admin', password: 'incorrect' } });
  assert.equal(limited.status, 429);
  assert.ok(Number(limited.response.headers.get('retry-after')) > 0);
});

test('unconfigured admin fails closed, and private files are not served', async context => {
  const app = await client(context, { adminCredentials: null });
  assert.equal((await app.request('/admin/api/session')).body.configured, false);
  assert.equal((await app.request('/admin/api/login', { method: 'POST', value: { username: 'admin', password: 'any-password' } })).status, 503);
  for (const path of ['/.admin/credentials.json', '/.admin/content.json', '/.admin/published.json', '/tools/admin-auth.mjs', '/tests/admin.test.js']) assert.equal((await app.request(path)).status, 404, path);
  for (const path of ['/admin/', '/admin/admin.js', '/admin/admin.css']) {
    const result = await app.request(path);
    assert.equal(result.status, 200, path);
    assert.equal(result.response.headers.get('x-frame-options'), 'DENY');
    assert.match(result.response.headers.get('x-robots-tag'), /noindex/);
    assert.match(result.response.headers.get('content-security-policy'), /frame-ancestors 'none'/);
  }
});

test('save and publish update bilingual routes, exclude drafts, prevent conflicts, and remove deleted pages', async context => {
  const directory = await fixture();
  const app = await client(context, { rootDirectory: directory });
  await app.login();
  const original = (await app.request('/admin/api/data')).body;
  const originalHomepage = (await app.request('/')).body;
  const edited = structuredClone(original);
  const provider = { ...structuredClone(edited.providers[0]), id: 'sample-edge', name: 'Sample Edge', logo: 'favicon.svg' };
  provider.seo.title = { zh: 'Sample Edge 独立档案', en: 'Sample Edge profile' };
  edited.providers.push(provider);
  const article = { ...structuredClone(edited.articles[0]), id: 'public-note', title: { zh: '<script>alert("x")</script> 发布检查', en: 'Published note' } };
  edited.articles.push(article);
  edited.articles.push({ ...structuredClone(article), id: 'private-note', status: 'draft', title: { zh: 'PRIVATE-DRAFT-MARKER', en: 'PRIVATE-DRAFT-MARKER' } });
  const saved = await app.request('/admin/api/data', { method: 'PUT', value: edited });
  assert.equal(saved.status, 200);
  assert.equal(saved.body.revision, 1);
  assert.equal((await app.request('/')).body, originalHomepage);
  assert.equal((await app.request('/article/public-note/')).status, 404);
  assert.equal((await app.request('/admin/api/data', { method: 'PUT', value: original })).status, 409);
  assert.equal((await app.request('/admin/api/publish', { method: 'POST', value: { revision: 0 } })).status, 409);
  const published = await app.request('/admin/api/publish', { method: 'POST', value: { revision: 1 } });
  assert.equal(published.status, 200);
  assert.equal(published.body.publishedRevision, 1);
  assert.ok(published.body.publishedAt);
  for (const prefix of ['', '/en']) {
    assert.equal((await app.request(prefix + '/providers/sample-edge/')).status, 200);
    const page = await app.request(prefix + '/article/public-note/');
    assert.equal(page.status, 200);
    assert.equal(page.body.includes('<script>alert'), false);
    assert.equal((await app.request(prefix + '/article/private-note/')).status, 404);
    for (const route of ['/', '/blog/', '/providers/']) assert.equal((await app.request(prefix + route)).body.includes('PRIVATE-DRAFT-MARKER'), false);
  }
  assert.match((await app.request('/article/public-note/')).body, /&lt;script&gt;alert/);
  assert.ok((await app.request('/')).body.includes('id="provider-total">' + (PROVIDERS.length + 1) + '</strong>'));
  assert.equal((await app.request('/admin-overrides.js')).body.includes('PRIVATE-DRAFT-MARKER'), false);
  const updated = structuredClone(published.body);
  updated.providers = updated.providers.filter(item => item.id !== 'sample-edge');
  updated.articles = updated.articles.filter(item => item.id !== 'public-note');
  const next = await app.request('/admin/api/data', { method: 'PUT', value: updated });
  assert.equal(next.body.revision, 2);
  assert.equal((await app.request('/admin/api/publish', { method: 'POST', value: { revision: 2 } })).status, 200);
  for (const prefix of ['', '/en']) {
    assert.equal((await app.request(prefix + '/providers/sample-edge/')).status, 404);
    assert.equal((await app.request(prefix + '/article/public-note/')).status, 404);
  }
  await assert.rejects(stat(resolve(directory, 'article/public-note/index.html')), { code: 'ENOENT' });
  const restored = new AdminStore(directory, PROVIDERS, ARTICLES);
  assert.equal((await restored.getData()).publishedRevision, 2);
  assert.ok((await restored.getData()).articles.some(item => item.id === 'private-note'));
  assert.equal(restored.published.articles.some(item => item.id === 'private-note'), false);
});

test('failed publication preserves the previous public pages and cleans staging files', async context => {
  const directory = await fixture();
  const app = await client(context, { rootDirectory: directory });
  await app.login();
  const homepage = await readFile(resolve(directory, 'index.html'), 'utf8');
  const overrides = await readFile(resolve(directory, 'admin-overrides.js'), 'utf8');
  const data = (await app.request('/admin/api/data')).body;
  data.providers[0].logo = 'assets/logos/missing-logo.svg';
  assert.equal((await app.request('/admin/api/data', { method: 'PUT', value: data })).status, 200);
  assert.equal((await app.request('/admin/api/publish', { method: 'POST', value: { revision: 1 } })).status, 400);
  assert.equal(await readFile(resolve(directory, 'index.html'), 'utf8'), homepage);
  assert.equal(await readFile(resolve(directory, 'admin-overrides.js'), 'utf8'), overrides);
  assert.equal((await app.request('/admin/api/data')).body.publishedRevision, 0);
  assert.equal((await readdir(resolve(directory, '.admin'))).some(name => name.startsWith('publish-')), false);
});
