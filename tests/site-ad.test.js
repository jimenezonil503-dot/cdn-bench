import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ARTICLES, PROVIDERS } from '../content.js';

test('every public page exposes the managed banner and two floating advertising slots', async () => {
  const routes = [
    '',
    'en/',
    'providers/',
    'en/providers/',
    'blog/',
    'en/blog/',
    'lab/',
    'en/lab/',
    'methodology/',
    'en/methodology/',
    ...ARTICLES.flatMap(article => [`article/${article.id}/`, `en/article/${article.id}/`]),
    ...PROVIDERS.flatMap(provider => [`providers/${provider.id}/`, `en/providers/${provider.id}/`]),
  ];

  for (const route of routes) {
    const html = await readFile(new URL(`../${route}index.html`, import.meta.url), 'utf8');
    assert.equal((html.match(/data-ad-slot="sitewide-top"/g) ?? []).length, 1, route || '/');
    assert.equal((html.match(/data-ad-slot="sitewide-left"/g) ?? []).length, 1, route || '/');
    assert.equal((html.match(/data-ad-slot="sitewide-right"/g) ?? []).length, 1, route || '/');
    assert.match(html, /src="[^\"]*advertising.js" defer/);
    assert.match(html, /href="[^\"]*advertising.css"/);
    assert.match(html, /class="site-ad-slot"[^>]*role="complementary"/);
  }

  const styles = await readFile(new URL('../styles.css', import.meta.url), 'utf8');
  assert.match(styles, /\.site-ad-slot\{/);
  assert.match(styles, /@media\(max-width:520px\)\{\.site-ad-slot\{/);
  assert.doesNotMatch(styles, /\.site-ad-slot\{[^}]*display:\s*none/);
});
