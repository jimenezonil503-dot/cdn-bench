import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { ARTICLES } from '../content.js';
import { articleLinkParts, plainArticleText, renderArticleText, articleBodyText, renderArticleExtras, validArticleImage } from '../article-links.js';
import {TITLES,SLUGS} from '../editorial/catalogue.js';
import { articleMetadata } from '../tools/build-pages.mjs';
import { seedContent, validateContent } from '../tools/admin-content.mjs';
import { filterArticles } from '../platform.js';

const root = fileURLToPath(new URL('../', import.meta.url));

test('original four long articles preserve their content and keyword anchors', () => {
  for (const article of ARTICLES.filter(item => !item.seriesOrder)) {
    const paragraphs = article.sections.flatMap(section => [...(section.paragraphs ?? []), ...(section.bullets ?? [])]);
    const body = paragraphs.map(item => plainArticleText(item.zh)).join('');
    assert.ok((body.match(/\p{Script=Han}/gu) ?? []).length > 3000, article.id);
    const links = paragraphs.flatMap(item => articleLinkParts(item.zh)).filter(part => part.href);
    assert.ok(links.some(part => part.text === '高防CDN' && part.href === 'https://www.cdn5.com/'), article.id);
    assert.ok(links.some(part => part.text === '免备案CDN' && part.href === 'https://www.jqcdn.com/'), article.id);
    assert.ok(links.filter(part => !part.external).length >= 3);
    assert.ok(links.filter(part => part.external).length >= 4);
    for (const part of links.filter(part => part.external)) assert.ok(article.sources.some(source => source.url === part.href));
  }
});

test('inline links escape HTML and reject unsafe or escaping destinations', () => {
  for (const input of ['[bad](javascript:alert)', '[bad](data:text/html,test)', '[bad](//evil.test)', '[bad](../private/)', '[bad](https://user:pass@evil.test/)']) {
    assert.ok(!renderArticleText(input).includes('<a '), input);
  }
  const html = renderArticleText('<img src=x onerror=alert(1)> [Safe](https://example.test/?x=1&y=2)');
  assert.ok(!html.includes('<img'));
  assert.ok(html.includes('&lt;img'));
  assert.ok(html.includes('href="https://example.test/?x=1&amp;y=2"'));
  assert.ok(renderArticleText('[Read](article/cache-cors-basics/)', 'en', '../../../').includes('href="../../../en/article/cache-cors-basics/"'));
});

test('article metadata safely serializes text without inventing a production domain', () => {
  const title = '</script><script>alert(1)</script>';
  const article = { ...ARTICLES[0], title: { zh: title, en: title } };
  const html = articleMetadata(article, 'zh', 'article/' + article.id + '/', '');
  assert.ok(!html.includes('<script>alert'));
  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.headline, title);
  assert.equal(schema['@type'], 'BlogPosting');
  assert.equal(schema.url, undefined);
  assert.equal(schema.aggregateRating, undefined);
  const production = articleMetadata(ARTICLES[0], 'en', 'en/article/' + article.id + '/', 'https://example.test/project');
  const data = [...production.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  assert.equal(data[0].url, 'https://example.test/project/en/article/' + article.id + '/');
  assert.equal(data[1]['@type'], 'BreadcrumbList');
  assert.equal(data[1].itemListElement[1].item, 'https://example.test/project/en/blog/');
});

test('article links, anchors, and citations resolve in both languages with deployment prefixes', async () => {
  for (const article of ARTICLES) for (const language of ['zh', 'en']) {
    const route = (language === 'en' ? 'en/' : '') + 'article/' + article.id + '/';
    const html = await readFile(resolve(root, route, 'index.html'), 'utf8');
    const base = 'https://example.test/project/' + route;
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
    assert.ok(html.includes('class="article-toc"'));
    assert.ok(html.includes('class="article-related"'));
    assert.ok(!html.includes('en/en/'));
    const visible = html.split('<main id="main">')[1].split('</main>')[0];
    assert.ok(!/\[[^\]]+\]\(https:/.test(visible));
    for (const match of html.matchAll(/<a[^>]*href="([^"]+)"/g)) {
      const url = new URL(match[1].replaceAll('&amp;', '&'), base);
      if (url.origin !== 'https://example.test') continue;
      assert.ok(url.pathname.startsWith('/project/'), url.href);
      const relativePath = url.pathname.slice('/project/'.length);
      await readFile(resolve(root, relativePath, relativePath.endsWith('.svg') ? '' : 'index.html'));
      if (url.hash && url.pathname === new URL(base).pathname) assert.ok(html.includes('id="' + url.hash.slice(1) + '"'));
    }
    const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(schema.headline, article.title[language]);
    assert.equal(schema.citation.length, article.sources.length);
    assert.ok(!schema.articleBody.includes(']('));
  }
});

test('admin round trips retain update dates and links, and search includes body topics', () => {
  const original = seedContent([], ARTICLES);
  const result = validateContent(JSON.parse(JSON.stringify(original)));
  assert.equal(result.articles[0].modified, '2026-10-14');
  assert.deepEqual(result.articles[0].sections, original.articles[0].sections);
  assert.ok(filterArticles('Timing-Allow-Origin').some(article => article.id === 'browser-cdn-benchmark-method'));
});
