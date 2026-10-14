import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ARTICLES, PROVIDERS, providerCategories, findArticle, findProvider, filterProviders, filterArticles } from '../platform.js';
import { getProviderSeo } from '../seo-content.js';
import { translations } from '../i18n.js';
import { createPreviewServer } from '../tools/serve.mjs';
import { DEFAULT_ENDPOINTS } from '../benchmark.js';

function assertCopy(value) {
  for (const language of ['zh', 'en']) assert.ok(typeof value?.[language] === 'string' && value[language].trim());
}

test('directory contains over sixty unique sourced provider brands', async () => {
  assert.ok(PROVIDERS.length > 60);
  assert.equal(new Set(PROVIDERS.map(provider => provider.id)).size, PROVIDERS.length);
  assert.equal(findProvider('cdn5').name, 'CDN5');
  assert.equal(findProvider('cloudflare').name, 'Cloudflare');
  assert.equal(findProvider('yewsafe').name, 'YewSafe');
  for (const provider of PROVIDERS) {
    assert.match(provider.id, /^[a-z0-9-]+$/);
    assert.equal(new URL(provider.officialUrl).protocol, 'https:');
    assert.equal(new URL(provider.sourceUrl ?? provider.officialUrl).protocol, 'https:');
    assert.match(provider.logo, /^assets\/logos\//);
    await readFile(new URL(`../${provider.logo}`, import.meta.url));
    assert.match(provider.verified, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(provider.categories.length);
    assert.ok(provider.categories.every(category => providerCategories.includes(category)));
    for (const field of ['tagline', 'intro', 'bestFor', 'watchouts', 'sourceLabel']) assertCopy(provider[field]);
    for (const highlight of provider.highlights) assertCopy(highlight);
    for (const field of ['delivery', 'security', 'edge', 'origin', 'fit']) assertCopy(provider.compare[field]);
    for (const field of ['score', 'rank', 'latency', 'throughputMbps', 'uptime']) assert.equal(provider[field], undefined);
  }
});

test('each provider has bilingual SEO copy and static detail pages', async () => {
  for (const provider of PROVIDERS) {
    const seo = getProviderSeo(provider);
    assert.ok(seo, `Missing SEO copy for ${provider.id}`);
    for (const field of ['title', 'description', 'analysis']) assertCopy(seo[field]);
    assert.ok(seo.questions.length >= 2);
    seo.questions.forEach(assertCopy);
    for (const language of ['zh', 'en']) {
      const pagePath = language === 'en' ? `../en/providers/${provider.id}/index.html` : `../providers/${provider.id}/index.html`;
      const html = await readFile(new URL(pagePath, import.meta.url), 'utf8');
      assert.match(html, new RegExp(`<html lang="${language === 'en' ? 'en' : 'zh-CN'}">`));
      assert.match(html, new RegExp(`<title>${escapeRegExp(seo.title[language])}</title>`));
      assert.match(html, new RegExp(`name="description" content="${escapeRegExp(seo.description[language].replaceAll("'", "&#39;"))}"`));
      assert.match(html, /<h1>[^<]*(?:CDN|cdn)[^<]*<\/h1>/);
      assert.match(html, new RegExp(escapeRegExp(provider.name)));
      assert.match(html, /provider-list/);
      assert.match(html, /provider-related/);
      assert.match(html, /application\/ld\+json/);
      assert.match(html, /Official source|官方资料/);
    }
  }
});

test('provider lookup and bilingual filtering are case-insensitive and category-aware', () => {
  assert.equal(findProvider('missing'), null);
  assert.deepEqual(filterProviders('  cLoUdFlArE  ').map(provider => provider.id), ['cloudflare']);
  assert.ok(filterProviders('高防').some(provider => provider.id === 'cdn5'));
  assert.ok(filterProviders('AWS', 'cloud').some(provider => provider.id === 'cloudfront'));
  assert.equal(filterProviders('CDN5', 'cloud').length, 0);
  assert.equal(filterProviders('no-such-provider-xyz').length, 0);
  assert.equal(filterProviders('', 'missing').length, 0);
  assert.equal(filterProviders().length, PROVIDERS.length);
  for (const category of providerCategories) assert.ok(filterProviders('', category).every(provider => provider.categories.includes(category)));
});

test('blog has 54 unique, complete bilingual articles with primary references', () => {
  assert.equal(ARTICLES.length, 54);
  assert.equal(new Set(ARTICLES.map(article => article.id)).size, ARTICLES.length);
  for (const article of ARTICLES) {
    assert.match(article.id, /^[a-z0-9-]+$/);
    assert.equal(findArticle(article.id), article);
    assert.ok(Number.isInteger(article.readTime) && article.readTime > 0);
    for (const field of ['title', 'excerpt', 'category']) assertCopy(article[field]);
    assert.ok(article.sections.length >= 3);
    for (const section of article.sections) {
      assertCopy(section.heading);
      const paragraphs = [...section.paragraphs ?? [], ...section.bullets ?? []];
      assert.ok(paragraphs.length);
      paragraphs.forEach(assertCopy);
    }
    assert.ok(article.sources.length >= 2);
    for (const source of article.sources) {
      assert.equal(new URL(source.url).protocol, 'https:');
      assertCopy(source.label);
    }
  }
});

test('article search supports both languages and unknown routes return null', () => {
  assert.equal(findArticle('missing'), null);
  assert.equal(findArticle(null), null);
  assert.equal(filterArticles().length, ARTICLES.length);
  assert.ok(filterArticles('  cloUDflarE ').some(article => article.id === 'cdn5-cloudflare-compare'));
  assert.ok(filterArticles('配置').some(article => article.id === 'cache-cors-basics'));
  assert.ok(filterArticles('CORS').some(article => article.id === 'cache-cors-basics'));
  assert.equal(filterArticles('no-such-article-xyz').length, 0);
});

test('dynamic UI translation keys exist in both languages', async () => {
  const app = await readFile(new URL('../app.js', import.meta.url), 'utf8');
  const keys = [...app.matchAll(/\b(?:text|setMessage)\('([^']+)'/g)].map(match => match[1]);
  for (const key of keys) {
    assert.ok(translations.zh[key], `Missing Chinese key: ${key}`);
    assert.ok(translations.en[key], `Missing English key: ${key}`);
  }
});

test('preview serves every bilingual page, logo and dependency without exposing workspace files', async context => {
  const server = createPreviewServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  context.after(() => new Promise(resolve => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const paths = ['/', '/en/', ...PROVIDERS.flatMap(provider => [`/providers/${provider.id}/`, `/en/providers/${provider.id}/`])];
  for (const path of paths) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get('content-type'), /text\/html/);
    const html = await response.text();
    for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
      if (/^https?:/.test(match[1])) continue;
      const dependency = new URL(match[1], `${origin}${path}`);
      assert.equal((await fetch(dependency, { method: 'HEAD' })).status, 200, `${path} -> ${dependency.pathname}`);
    }
  }
  for (const item of [...PROVIDERS, ...DEFAULT_ENDPOINTS]) {
    const response = await fetch(`${origin}/${item.logo}`);
    assert.equal(response.status, 200, item.logo);
    assert.match(response.headers.get('content-type'), /^image\/(?:svg\+xml|png|jpeg|webp)/);
    assert.ok((await response.arrayBuffer()).byteLength > 100);
  }
  const redirect = await fetch(`${origin}/en?preview=1`, { redirect: 'manual' });
  assert.equal(redirect.status, 301);
  assert.equal(redirect.headers.get('location'), '/en/?preview=1');
  assert.equal((await fetch(`${origin}/`, { method: 'POST' })).status, 405);
  assert.equal((await fetch(`${origin}/%ZZ`)).status, 400);
  for (const path of ['/README.md', '/package.json', '/tools/serve.mjs', '/tests/platform.test.js', '/providers/missing/', '/assets/logos/missing.svg', '/assets/logos/%2e%2e%5c%2e%2e%5cREADME.md', '/providers/%2e%2e%2fREADME.md']) {
    assert.equal((await fetch(`${origin}${path}`)).status, 404, path);
  }
  for (const filename of ['app.js', 'platform.js', 'benchmark.js', 'i18n.js', 'content.js']) {
    const response = await fetch(`${origin}/${filename}`);
    assert.equal(response.status, 200);
    const source = await response.text();
    for (const match of source.matchAll(/from '\.\/([^']+)'/g)) assert.equal((await fetch(`${origin}/${match[1]}`)).status, 200, match[1]);
  }
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
