import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES, PROVIDERS } from '../content.js';
import { AD_POSITIONS, DEFAULT_ADVERTISING, adExpiresAt, adIsActive, publicAdvertising, renderAdvertising } from '../tools/advertising.mjs';
import { seedContent, validateAdvertising, validateContent } from '../tools/admin-content.mjs';
import { decodeAdImage, MAX_AD_IMAGE_BYTES } from '../tools/ad-upload.mjs';
import { createCredentials } from '../tools/admin-auth.mjs';
import { AdminStore } from '../tools/admin-store.mjs';
import { createPreviewServer } from '../tools/serve.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const workRoot = fileURLToPath(new URL('../../../work/advertising-checks/', import.meta.url));
const png = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jA1sAAAAASUVORK5CYII=';
const code = '<div id="ad-test">AD-CODE-MARKER</div><script>document.querySelector("#ad-test").textContent="Running";</script>';

test('legacy content gains advertising slots without changing editorial or contact data', () => {
  const old = seedContent(PROVIDERS, ARTICLES); delete old.advertising;
  const upgraded = validateContent(old);
  assert.deepEqual(upgraded.advertising, DEFAULT_ADVERTISING);
  assert.deepEqual(upgraded.contact, old.contact);
  assert.deepEqual(upgraded.articles, old.articles);
  assert.deepEqual(upgraded.providers, old.providers);
  old.advertising = structuredClone(DEFAULT_ADVERTISING.zh);
  old.advertising.top = { ...old.advertising.top, type: 'code', code: 'LEGACY-ZH-CREATIVE' };
  const shared = validateContent(old);
  assert.equal(shared.advertising.zh.top.code, 'LEGACY-ZH-CREATIVE');
  assert.equal(shared.advertising.en.top.type, 'placeholder');
  assert.doesNotMatch(renderAdvertising(shared.advertising, 'en'), /LEGACY-ZH-CREATIVE/);
  old.advertising.top = { ...old.advertising.top, type: 'image', image: 'https://example.com/legacy.png', alt: { zh: '旧中文图片说明', en: 'Legacy English alt' } };
  assert.equal(validateContent(old).advertising.zh.top.alt, '旧中文图片说明');
});

test('advertising validation rejects unsafe paths, invalid dates and incomplete creatives', () => {
  for (const change of [{ enabled: 'yes' }, { type: 'other' }, { height: 0 }, { height: 601 }, { expiresOn: '2026-02-30' }, { expiresOn: 'not-a-date' }, { image: 'assets/ads/../secret.png' }, { image: 'javascript:alert(1)' }, { link: 'http://example.com' }, { link: 'https://user:pass@example.com' }, { type: 'image', image: '' }, { type: 'code', code: '' }, { code: 'x'.repeat(100001) }]) {
    const ads = structuredClone(DEFAULT_ADVERTISING); Object.assign(ads.zh.top, change);
    assert.throws(() => validateAdvertising(ads), { status: 400 }, JSON.stringify(change).slice(0, 100));
  }
  assert.throws(() => validateAdvertising({ other: {} }), { status: 400 });
  const valid = structuredClone(DEFAULT_ADVERTISING);
  valid.zh.top = { ...valid.zh.top, type: 'image', image: 'https://example.com/banner.png', link: 'https://example.com/', expiresOn: '2028-02-29' };
  valid.zh.left = { ...valid.zh.left, type: 'code', code };
  assert.equal(validateAdvertising(valid).zh.top.expiresOn, '2028-02-29');
  assert.throws(() => validateAdvertising({ ...valid, fr: {} }), { status: 400 });
  assert.throws(() => validateAdvertising({ ...valid, en: { other: {} } }), { status: 400 });
  assert.throws(() => validateAdvertising({ ...valid, en: null }), { status: 400 });
  for (const mobileImage of ['javascript:alert(1)', 'assets/ads/../private.png', 'http://example.com/mobile.png']) {
    assert.throws(() => validateAdvertising({ ...valid, zh: { ...valid.zh, top: { ...valid.zh.top, mobileImage } } }), { status: 400 });
  }
});

test('an advertisement expires at the end of its selected date in UTC+8', () => {
  const ad = { ...DEFAULT_ADVERTISING.zh.top, expiresOn: '2026-10-15' };
  const cutoff = Date.parse('2026-10-15T16:00:00Z');
  assert.equal(adExpiresAt(ad), cutoff);
  assert.equal(adIsActive(ad, cutoff - 1), true);
  assert.equal(adIsActive(ad, cutoff), false);
  assert.equal(adIsActive({ ...ad, enabled: false }, cutoff - 1), false);
  assert.equal(adIsActive({ ...ad, expiresOn: '' }, cutoff + 86400000), true);
});

test('rendering isolates executable ads, escapes attributes and excludes expired creatives', () => {
  const ads = structuredClone(DEFAULT_ADVERTISING);
  ads.zh.top = { ...ads.zh.top, type: 'code', code };
  ads.zh.left = { ...ads.zh.left, type: 'image', image: 'assets/ads/' + 'a'.repeat(64) + '.png', link: 'https://example.com/?a=1&b=2', alt: '"><script>bad()</script>' };
  ads.zh.right = { ...ads.zh.right, type: 'code', code: 'EXPIRED-CREATIVE', expiresOn: '2020-01-01' };
  ads.en.top = { ...ads.en.top, type: 'code', code: 'ENGLISH-ONLY-CREATIVE' };
  const html = renderAdvertising(ads, 'zh', '../../../');
  assert.match(html, /<template data-ad-creative>/);
  assert.match(html, /sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"/);
  assert.doesNotMatch(html, /allow-same-origin|<script>|EXPIRED-CREATIVE/);
  assert.match(html, /src="\.\.\/\.\.\/\.\.\/assets\/ads\//);
  assert.match(html, /rel="sponsored noopener noreferrer"/);
  assert.match(html, /&quot;&gt;&lt;script&gt;/);
  assert.doesNotMatch(html, /ENGLISH-ONLY-CREATIVE/);
  const english = renderAdvertising(ads, 'en', '../../../');
  assert.match(english, /ENGLISH-ONLY-CREATIVE/);
  assert.doesNotMatch(english, /AD-CODE-MARKER|bad\(\)|EXPIRED-CREATIVE/);
  ads.zh.left.enabled = false;
  const publicAds = publicAdvertising(ads);
  assert.equal(publicAds.zh.left.image, '');
  assert.equal(publicAds.zh.right.code, '');
  assert.equal(publicAds.zh.top.code, code);
  assert.equal(publicAds.en.top.code, 'ENGLISH-ONLY-CREATIVE');
});

test('image uploads check actual format, canonical base64 and size', () => {
  assert.equal(decodeAdImage(png).extension, 'png');
  for (const data of [Buffer.from('<html><script>alert(1)</script></html>').toString('base64'), Buffer.from('<svg/>').toString('base64'), '%%%=', png + 'junk']) assert.throws(() => decodeAdImage(data), { status: 400 });
  assert.throws(() => decodeAdImage(Buffer.alloc(MAX_AD_IMAGE_BYTES + 1).toString('base64')), { status: 413 });
});

test('authenticated upload, private preview, publication, expiration and restart preserve advertising state', async context => {
  await mkdir(workRoot, { recursive: true });
  const directory = await mkdtemp(resolve(workRoot, 'fixture-'));
  context.after(async () => { assert.equal(dirname(directory), resolve(workRoot)); await rm(directory, { recursive: true, force: true }); });
  for (const path of ['tools', 'admin', 'assets', 'editorial', 'content.js', 'platform.js', 'article-links.js', 'seo-content.js', 'i18n.js', 'benchmark.js', 'app.js', 'styles.css', 'platform.css', 'platform-overrides.css', 'homepage.css', 'rankings.css', 'provider-page.css', 'navigation.css', 'contact.css', 'contact-submit.js', 'site-shell.js', 'advertising.js', 'advertising.css', 'favicon.svg', 'package.json']) {
    await cp(resolve(root, path), resolve(directory, path), { recursive: true });
  }
  const seed = new AdminStore(directory, PROVIDERS, ARTICLES);
  await seed.publish(0);
  const credentials = await createCredentials('ad-admin', 'advertising-test-password');
  const server = createPreviewServer({ rootDirectory: directory, adminCredentials: credentials });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  context.after(() => new Promise(done => server.close(done)));
  const origin = 'http://127.0.0.1:' + server.address().port;
  let cookie = '', csrf = '';
  const request = async (path, method = 'GET', body, headers = {}) => {
    const response = await fetch(origin + path, { method, headers: { Cookie: cookie, 'X-CSRF-Token': csrf, Origin: origin, ...(body ? { 'Content-Type': 'application/json' } : {}), ...headers }, body: body ? JSON.stringify(body) : undefined });
    return response;
  };
  assert.equal((await request('/admin/api/ad-upload', 'POST', { data: png })).status, 401);
  const login = await request('/admin/api/login', 'POST', { username: 'ad-admin', password: 'advertising-test-password' });
  cookie = login.headers.get('set-cookie').split(';')[0]; csrf = (await login.json()).csrfToken;
  assert.equal((await request('/admin/api/ad-upload', 'POST', { data: png }, { 'X-CSRF-Token': '' })).status, 403);
  assert.equal((await request('/admin/api/ad-upload', 'POST', { data: png }, { Origin: 'https://other.example' })).status, 403);
  assert.equal((await request('/admin/api/ad-upload', 'POST', { data: Buffer.from('<html/>').toString('base64') })).status, 400);
  const upload = await request('/admin/api/ad-upload', 'POST', { data: png });
  assert.equal(upload.status, 200);
  const { path } = await upload.json();
  const mobileUpload = await request('/admin/api/ad-upload', 'POST', { data: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' });
  assert.equal(mobileUpload.status, 200);
  const { path: mobilePath } = await mobileUpload.json();
  assert.notEqual(mobilePath, path);
  assert.equal((await request('/' + mobilePath)).status, 404);
  assert.equal((await request('/' + path)).status, 404);
  assert.equal((await request('/admin/api/ad-image/' + path.split('/').pop())).status, 200);
  assert.equal((await request('/admin/api/ad-image/' + path.split('/').pop(), 'GET', undefined, { Cookie: '' })).status, 401);
  const preview = await (await request('/admin/api/ad-preview', 'POST', { code })).json();
  const previewRoute = '/admin/' + preview.url.slice(2);
  const previewResponse = await request(previewRoute);
  assert.equal(previewResponse.status, 200);
  assert.match(previewResponse.headers.get('content-security-policy'), /sandbox allow-scripts/);
  assert.equal((await request(previewRoute, 'GET', undefined, { Cookie: '' })).status, 401);
  const original = await (await request('/admin/api/data')).json();
  const changed = structuredClone(original);
  changed.advertising.zh.top = { ...changed.advertising.zh.top, type: 'image', image: path, mobileImage: mobilePath, link: 'https://www.cdn5.com/', alt: '图片广告' };
  const expiryDate = new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);
  changed.advertising.zh.left = { ...changed.advertising.zh.left, type: 'code', code, expiresOn: expiryDate };
  changed.advertising.zh.right.enabled = false;
  changed.advertising.en.top = { ...changed.advertising.en.top, type: 'code', code: '<p>EN-BANNER-ONLY</p>', expiresOn: '2099-12-31' };
  changed.advertising.en.left = { ...changed.advertising.en.left, type: 'code', code: '<p>EN-RAIL-ONLY</p>', expiresOn: '2099-12-31' };
  let saved = await (await request('/admin/api/data', 'PUT', changed)).json();
  assert.equal(saved.revision, 1);
  assert.equal((await request('/' + path)).status, 404);
  assert.doesNotMatch(await (await request('/')).text(), /AD-CODE-MARKER/);
  assert.equal((await request('/admin/api/publish', 'POST', { revision: saved.revision })).status, 200);
  assert.equal((await request('/' + path)).status, 200);
  assert.equal((await request('/' + mobilePath)).status, 200);
  const staticChinese = await readFile(resolve(directory, 'article/ten-ddos-cdn-providers-2026/index.html'), 'utf8');
  const staticEnglish = await readFile(resolve(directory, 'en/article/ten-ddos-cdn-providers-2026/index.html'), 'utf8');
  assert.match(staticChinese, /AD-CODE-MARKER/);
  assert.doesNotMatch(staticChinese, /EN-BANNER-ONLY|EN-RAIL-ONLY/);
  assert.match(staticEnglish, /EN-BANNER-ONLY/);
  assert.doesNotMatch(staticEnglish, /AD-CODE-MARKER/);
  for (const route of ['/', '/blog/', '/providers/cloudflare/', '/article/ten-ddos-cdn-providers-2026/']) {
    const html = await (await request(route)).text();
    assert.match(html, /AD-CODE-MARKER/);
    assert.match(html, /data-ad-type="image"/);
    assert.doesNotMatch(html, /EN-BANNER-ONLY|EN-RAIL-ONLY/);
    assert.doesNotMatch(html, /data-ad-slot="sitewide-right"/);
    const src = html.match(/class="site-ad-image" src="([^"]+)"/)[1];
    assert.equal(new URL(src, origin + route).pathname, '/' + path);
    const mobileSrc = html.match(/<source media="\(max-width: 600px\)" srcset="([^"]+)"/)[1];
    assert.equal(new URL(mobileSrc, origin + route).pathname, '/' + mobilePath);
  }
  for (const route of ['/en/', '/en/blog/', '/en/providers/cloudflare/', '/en/article/ten-ddos-cdn-providers-2026/']) {
    const html = await (await request(route)).text();
    assert.match(html, /EN-BANNER-ONLY/);
    assert.match(html, /EN-RAIL-ONLY/);
    assert.match(html, /data-ad-slot="sitewide-right"/);
    assert.doesNotMatch(html.match(/<!--SITE_ADS_START-->[\s\S]*?<!--SITE_ADS_END-->/)[0], /AD-CODE-MARKER|site-ad-image|www\.cdn5\.com/);
  }
  const restored = new AdminStore(directory, PROVIDERS, ARTICLES);
  const restoredData = await restored.getData();
  assert.deepEqual(restoredData.advertising, changed.advertising);
  assert.deepEqual(restoredData.contact, original.contact);
  assert.deepEqual(restoredData.articles, original.articles);
  const realNow = Date.now;
  try {
    Date.now = () => Date.parse(expiryDate + 'T16:00:00Z');
    assert.doesNotMatch(await (await request('/')).text(), /AD-CODE-MARKER|data-ad-slot="sitewide-left"/);
    assert.doesNotMatch(await (await request('/site-settings.js')).text(), /AD-CODE-MARKER/);
    assert.match(await (await request('/en/blog/')).text(), /EN-RAIL-ONLY/);
  } finally { Date.now = realNow; }
  saved = await (await request('/admin/api/data')).json();
  saved.advertising.zh.top.mobileImage = 'assets/ads/' + 'b'.repeat(64) + '.png';
  const missing = await (await request('/admin/api/data', 'PUT', saved)).json();
  assert.equal((await request('/admin/api/publish', 'POST', { revision: missing.revision })).status, 400);
  assert.match(await (await request('/')).text(), /AD-CODE-MARKER/);
});
