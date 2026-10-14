import test from 'node:test';
import assert from 'node:assert/strict';
import { access, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { exportPages } from '../tools/export-pages.mjs';

test('Pages export keeps public assets, removes contact links, and excludes private/backend files', async context => {
  const temporaryRoot = resolve(tmpdir());
  const outputRoot = await mkdtemp(resolve(temporaryRoot, 'cdn-pages-'));
  context.after(async () => {
    assert.equal(dirname(outputRoot), temporaryRoot);
    await rm(outputRoot, { recursive: true, force: true });
  });
  await exportPages({ outputRoot, siteUrl: 'https://example.github.io/cdn-bench' });
  for (const route of ['', 'en/', 'providers/', 'en/blog/', 'article/ten-ddos-cdn-providers-2026/']) {
    const html = await readFile(resolve(outputRoot, route, 'index.html'), 'utf8');
    assert.doesNotMatch(html, /class="(?:contact-button|mobile-contact)"|cdnpingce\.com/);
    assert.doesNotMatch(html, /href="(?:\.{1,2}\/)*(?:en\/)?contact\/"/);
    assert.match(html, /rel="canonical" href="https:\/\/example.github.io\/cdn-bench\//);
  }
  for (const language of ['', 'en/']) {
    await assert.rejects(access(resolve(outputRoot, language, 'contact/index.html')), { code: 'ENOENT' });
  }
  for (const path of ['.admin', 'admin', 'tools', 'tests', '.github', 'contact-submit.js']) {
    await assert.rejects(access(resolve(outputRoot, path)), { code: 'ENOENT' });
  }
  const sitemap = await readFile(resolve(outputRoot, 'sitemap.xml'), 'utf8');
  assert.doesNotMatch(sitemap, /\/contact\/</);
  assert.ok((await readdir(resolve(outputRoot, 'assets/ads'))).length > 0);
  await access(resolve(outputRoot, 'editorial/articles-2026.js'));
  await access(resolve(outputRoot, '.nojekyll'));
});
