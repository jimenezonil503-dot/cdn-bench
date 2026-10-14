import test from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROVIDERS, ARTICLES } from '../content.js';
import { DEFAULT_CONTACT, renderContact } from '../tools/contact.mjs';
import { validateContact } from '../tools/admin-content.mjs';
import { AdminStore } from '../tools/admin-store.mjs';
import { createPreviewServer } from '../tools/serve.mjs';
import { renderSiteHeader } from '../tools/site-shell.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const workRoot = fileURLToPath(new URL('../../../work/contact-checks/', import.meta.url));
const channel = (type, value, enabled = true) => ({ type, value, enabled, label: { zh: '', en: '' }, note: { zh: '', en: '' }, qrCode: '' });

test('contact settings migrate old saves, reject unsafe destinations, and render escaped bilingual copy', () => {
  assert.deepEqual(validateContact(), DEFAULT_CONTACT);
  const content = { ...DEFAULT_CONTACT, title: { zh: '<script>test</script>', en: 'Send your message' }, channels: [channel('email', 'hello@example.com'), channel('wechat', '<script>test</script>'), channel('telegram', '@sample_team')] };
  const valid = validateContact(content);
  for (const [type, value] of [['email', 'a@b.test?bcc=other@b.test'], ['phone', '-----'], ['telegram', 'https://evil.test/name'], ['telegram', 'javascript:alert(1)'], ['link', 'javascript:alert(1)']]) {
    assert.throws(() => validateContact({ ...content, channels: [channel(type, value)] }), { status: 400 });
  }
  assert.throws(() => validateContact({ ...content, channels: [{ ...channel('wechat', 'sample'), qrCode: 'data:image/svg+xml,<svg/>' }] }), { status: 400 });
  for (const language of ['zh', 'en']) {
    const html = renderContact(valid, language);
    assert.match(html, /class="contact-submission-form"/);
    for (const name of ['title', 'content', 'contact']) assert.match(html, new RegExp('name="' + name + '"'));
    assert.doesNotMatch(html, /mailto:hello@example.com|https:\/\/t.me\/sample_team/);
    assert.ok(!html.includes('<script>test</script>'));
    if (language === 'zh') assert.match(html, /&lt;script&gt;test&lt;\/script&gt;/);
    else assert.match(html, /Send your message/);
  }
});

test('navigation preserves a deployment prefix and active selection for nested pages in both languages', () => {
  for (const language of ['zh', 'en']) {
    const route = `${language === 'en' ? 'en/' : ''}providers/cloudflare/`;
    const prefix = language === 'en' ? '../../../' : '../../';
    const html = renderSiteHeader({ language, rootPrefix: prefix, route, alternateRoute: `${language === 'en' ? '' : 'en/'}providers/cloudflare/` });
    const base = `https://example.test/project/${route}`;
    assert.doesNotMatch(html, /contact-button|mobile-contact|contact\//);
    assert.match(html, /data-i18n="navProviders" aria-current="location"/);
    const languageLink = html.match(/id="language-toggle"[^>]*href="([^"]+)"/)[1];
    assert.equal(new URL(languageLink, base).pathname, `/project/${language === 'en' ? '' : 'en/'}providers/cloudflare/`);
  }
});

test('archived contact settings survive publication without recreating removed contact pages', async context => {
  await mkdir(workRoot, { recursive: true });
  const fixture = await mkdtemp(resolve(workRoot, 'fixture-'));
  context.after(async () => {
    assert.equal(dirname(fixture), resolve(workRoot));
    await rm(fixture, { recursive: true, force: true });
  });
  for (const path of ['tools', 'assets', 'editorial', 'content.js', 'platform.js', 'article-links.js', 'seo-content.js', 'i18n.js', 'benchmark.js', 'admin-overrides.js', 'site-settings.js', 'navigation.css', 'contact.css', 'contact-submit.js', 'site-shell.js', 'styles.css', 'platform.css', 'platform-overrides.css', 'homepage.css', 'rankings.css', 'app.js', 'favicon.svg']) {
    await cp(resolve(root, path), resolve(fixture, path), { recursive: true });
  }
  const store = new AdminStore(fixture, PROVIDERS, ARTICLES);
  const draft = await store.getData();
  draft.contact = { ...DEFAULT_CONTACT, channels: [channel('email', 'team@example.com'), channel('wechat', 'sample-wechat'), channel('telegram', '@sample_team'), channel('email', 'PRIVATE-HIDDEN@example.com', false)] };
  const saved = await store.save(draft);
  assert.equal(store.published.contact.channels.length, 0);
  assert.equal((await new AdminStore(fixture, PROVIDERS, ARTICLES).getData()).contact.channels.length, 4);
  await store.publish(saved.revision);
  const server = createPreviewServer({ rootDirectory: fixture });
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  context.after(() => new Promise(done => server.close(done)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  for (const route of ['/contact/', '/en/contact/']) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 404);
  }
  const publicSettings = await readFile(resolve(fixture, 'site-settings.js'), 'utf8');
  assert.equal(publicSettings.includes('PRIVATE-HIDDEN'), false);
  const redirect = await fetch(origin + '/contact', { redirect: 'manual' });
  assert.equal(redirect.status, 404);
  assert.equal(redirect.headers.get('location'), null);
  const restored = new AdminStore(fixture, PROVIDERS, ARTICLES);
  const updated = await restored.getData();
  updated.contact.channels = [];
  await restored.save(updated);
  await restored.publish(updated.revision + 1);
  await assert.rejects(access(resolve(fixture, 'contact/index.html')), { code: 'ENOENT' });
});

test('generated bilingual menus include current-page selection and a keyboard-operable mobile menu', async () => {
  for (const page of ['providers/', 'blog/', 'lab/', 'methodology/']) {
    for (const language of ['zh', 'en']) {
      const route = `${language === 'en' ? 'en/' : ''}${page}`;
      const filename = resolve(root, route, 'index.html');
      const html = await readFile(filename, 'utf8');
      const navKey = { providers: 'navProviders', blog: 'navBlog', lab: 'navBench', methodology: 'navMethod' }[page.replace(/\/$/, '')];
      assert.ok(html.includes(`data-i18n="${navKey}" aria-current="page"`), route);
      assert.doesNotMatch(html, /class="(?:contact-button|mobile-contact)"/);
      assert.ok(html.includes('aria-controls="site-navigation" aria-expanded="false"'), route);
      assert.ok(html.includes(`${language === 'en' ? '../../' : '../'}navigation.css`), route);
    }
  }
  const script = await readFile(resolve(root, 'site-shell.js'), 'utf8');
  assert.match(script, /event\.key === 'Escape'/);
  assert.match(script, /aria-expanded/);
});
