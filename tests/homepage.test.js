import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ARTICLES, PROVIDERS } from '../content.js';
import { renderHomepage } from '../tools/homepage.mjs';

test('brand homepages keep full directory, journal, and lab interfaces on independent pages', () => {
  for (const language of ['zh', 'en']) {
    const html = renderHomepage(PROVIDERS, ARTICLES, language);
    assert.match(html, /class="home-hero"/);
    assert.match(html, /class="edge-globe"/);
    assert.equal((html.match(/class="home-story"/g) ?? []).length, 3);
    for (const id of ['provider-grid', 'blog-grid', 'start-test', 'home-routes']) assert.equal(html.includes(id), false);
    assert.match(html, /href="\.\/providers\/"/);
    assert.match(html, /href="\.\/blog\/"/);
    assert.match(html, /href="\.\/lab\/"/);
    assert.match(html, /href="\.\/methodology\/"/);
    assert.ok(html.includes('href="./article/' + ARTICLES[0].id + '/"'), 'Homepage previews the first published article');
    assert.equal(html.includes('#article/'), false);
    assert.ok(html.includes(language === 'en' ? 'A closer world.' : '让世界更近。'));
    assert.ok(html.includes(language === 'en' ? 'Not live network data' : '非实时节点'));
  }
});

test('homepage previews escape editorial text and support empty content after admin changes', () => {
  const article = structuredClone(ARTICLES[0]);
  article.title.zh = '<script>alert(1)</script>';
  const html = renderHomepage([], [article], 'zh');
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.equal(html.includes('<script>alert'), false);
  const empty = renderHomepage([], [], 'en');
  assert.match(empty, /id="provider-total">0<\/strong>/);
  assert.equal(empty.includes('class="home-story"'), false);
});

test('homepage styling is isolated from independently generated sections and articles', async () => {
  const homepage = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(homepage, /<body class="homepage">/);
  assert.match(homepage, /href="\.\/homepage.css"/);
  for (const path of ['providers/index.html', 'en/providers/index.html', 'blog/index.html', 'en/blog/index.html', 'lab/index.html', 'methodology/index.html', 'article/cdn-selection-framework/index.html']) {
    const page = await readFile(new URL('../' + path, import.meta.url), 'utf8');
    assert.equal(page.includes('<body class="homepage">'), false, path);
    assert.equal(page.includes('homepage.css'), false, path);
    assert.equal(page.includes('{{HOME_CONTENT}}'), false, path);
  }
});
