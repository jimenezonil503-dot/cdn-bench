import test from 'node:test';
import assert from 'node:assert/strict';
import { access, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { exportPages } from '../tools/export-pages.mjs';
import { runInNewContext } from 'node:vm';

test('Pages export keeps public assets, removes contact links, and excludes private/backend files', async context => {
  const temporaryRoot = resolve(tmpdir());
  const outputRoot = await mkdtemp(resolve(temporaryRoot, 'cdn-pages-'));
  context.after(async () => {
    assert.equal(dirname(outputRoot), temporaryRoot);
    await rm(outputRoot, { recursive: true, force: true });
  });
  const siteUrl = 'https://example.github.io';
  const result = await exportPages({ outputRoot, siteUrl });
  for (const route of ['', 'en/', 'providers/', 'en/blog/', 'article/ten-ddos-cdn-providers-2026/']) {
    const html = await readFile(resolve(outputRoot, route, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /class="(?:contact-button|mobile-contact)"|cdnpingce\.com/);
    assert.doesNotMatch(html, /href="(?:\.{1,2}\/)*(?:en\/)?contact\/"/);
    assert.ok(html.includes(`rel="canonical" href="${siteUrl}/${route}"`));
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), `${siteUrl}/${route}`);
      if (url.origin !== siteUrl) continue;
      assert.ok(!url.pathname.startsWith('/cdn-bench/'));
      const resource = decodeURIComponent(url.pathname.slice(1)) + (url.pathname.endsWith('/') ? 'index.html' : '');
      await access(resolve(outputRoot, resource));
    }
  }
  for (const language of ['', 'en/']) {
    await assert.rejects(access(resolve(outputRoot, language, 'contact/index.html')), { code: 'ENOENT' });
  }
  for (const path of ['.admin', 'admin', 'tools', 'tests', '.github', 'contact-submit.js']) {
    await assert.rejects(access(resolve(outputRoot, path)), { code: 'ENOENT' });
  }
  const sitemap = await readFile(resolve(outputRoot, 'sitemap.xml'), 'utf8');
  assert.doesNotMatch(sitemap, /\/contact\/</);
  assert.doesNotMatch(sitemap, /\/cdn-bench\//);
  assert.ok(sitemap.includes(`<loc>${siteUrl}/</loc>`));
  assert.ok(sitemap.includes(`<loc>${siteUrl}/en/</loc>`));
  const destinations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(result.redirects, destinations.length);
  for (const target of destinations) {
    const route = new URL(target).pathname.slice(1);
    const legacy = await readFile(resolve(outputRoot, 'cdn-bench', route, 'index.html'), 'utf8');
    assert.ok(legacy.includes(`rel="canonical" href="${target}"`));
    assert.ok(legacy.includes(`content="0;url=${target}"`));
    assert.ok(legacy.includes(`data-destination="${target}"`));
    assert.ok(legacy.includes('content="noindex,follow"'));
  }
  const redirectScript = await readFile(resolve(outputRoot, 'legacy-redirect.js'), 'utf8');
  let redirected;
  const target = `${siteUrl}/en/providers/akamai/`;
  runInNewContext(redirectScript, {
    URL,
    document: { currentScript: { dataset: { destination: target } } },
    location: { origin: siteUrl, search: '?ref=bookmark&lang=en', hash: '#features', replace: value => { redirected = value; } },
  });
  assert.equal(redirected, `${target}?ref=bookmark&lang=en#features`);
  for (const path of ['cdn-bench/contact/index.html', 'cdn-bench/en/contact/index.html', 'cdn-bench/admin/index.html']) {
    await assert.rejects(access(resolve(outputRoot, path)), { code: 'ENOENT' });
  }
  assert.ok((await readdir(resolve(outputRoot, 'assets/ads'))).length > 0);
  await access(resolve(outputRoot, 'editorial/articles-2026.js'));
  await access(resolve(outputRoot, '.nojekyll'));
});
