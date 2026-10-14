import test, { after, before } from 'node:test';
import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES, PROVIDERS } from '../content.js';
import { getProviderSeo } from '../seo-content.js';
import { buildPages, normalizeSiteUrl } from '../tools/build-pages.mjs';

const workRoot = fileURLToPath(new URL('../../../work/seo-checks/', import.meta.url));
const fixtures = [];
const siteUrl = 'https://cdn-bench.test/project-site';
let localRoot;
let productionRoot;

async function fixtureRoot() {
  const directory = await mkdtemp(resolve(workRoot, 'fixture-'));
  fixtures.push(directory);
  return directory;
}

function htmlValue(html, pattern) {
  const value = html.match(pattern)?.[1];
  assert.ok(value, pattern.toString());
  return value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
}

before(async () => {
  await mkdir(workRoot, { recursive: true });
  localRoot = await fixtureRoot();
  productionRoot = await fixtureRoot();
  await buildPages({ outputRoot: localRoot, siteUrl: '' });
  await buildPages({ outputRoot: productionRoot, siteUrl });
});

after(async () => {
  for (const directory of fixtures) {
    assert.equal(dirname(resolve(directory)), resolve(workRoot));
    await rm(directory, { recursive: true, force: true });
  }
});

test('bilingual homepages expose independent menu routes and correct assets in static HTML', async () => {
  for (const language of ['zh', 'en']) {
    const route = language === 'en' ? 'en/' : '';
    const html = await readFile(resolve(localRoot, route, 'index.html'), 'utf8');
    const documentUrl = `${siteUrl}/${route}`;
    assert.ok(html.includes('id="provider-total">' + PROVIDERS.length + '</strong>'));
    for (const section of ['providers', 'blog', 'lab', 'methodology']) {
      const link = htmlValue(html, new RegExp(`href="([^"]+)" data-i18n="${{ providers: 'navProviders', blog: 'navBlog', lab: 'navBench', methodology: 'navMethod' }[section]}"`));
      assert.equal(new URL(link, documentUrl).pathname, `/project-site/${route}${section}/`);
    }
    for (const provider of PROVIDERS) {
      assert.ok(html.includes('href="./providers/' + provider.id + '/"'));
    }
    for (const match of html.matchAll(/src="([^"#]+)"/g)) {
      const resource = new URL(match[1], documentUrl);
      assert.ok(!resource.pathname.includes('/en/assets/'), resource.pathname);
      assert.ok(resource.pathname.startsWith('/project-site/'));
    }
    const toggle = htmlValue(html, /id="language-toggle"[^>]*href="([^"]+)"/);
    assert.equal(new URL(toggle, documentUrl).href, `${siteUrl}/${language === 'en' ? '' : 'en/'}`);
    if (language === 'en') assert.ok(!html.includes('适合 ·'));
    assert.ok(!html.includes('rel="canonical"'));
    assert.ok(!html.includes('hreflang='));
  }
  await assert.rejects(stat(resolve(localRoot, 'sitemap.xml')), { code: 'ENOENT' });
  assert.ok(!(await readFile(resolve(localRoot, 'robots.txt'), 'utf8')).includes('Sitemap:'));
});

test('bilingual section and article routes are generated with reciprocal language links', async () => {
  const routes = ['providers', 'blog', 'lab', 'methodology'];
  for (const route of routes) {
    for (const language of ['zh', 'en']) {
      const currentRoute = `${language === 'en' ? 'en/' : ''}${route}/`;
      const html = await readFile(resolve(localRoot, currentRoute, 'index.html'), 'utf8');
      assert.match(html, /<main id="main">/);
      assert.match(html, new RegExp(`id="${route}"`));
      assert.match(html, /<h1\b/);
      if (route === 'providers') {
        assert.match(html, /id="provider-grid"/);
        assert.equal((html.match(/class="provider-card /g) ?? []).length, PROVIDERS.length);
      }
      if (route === 'blog') {
        assert.match(html, /id="blog-grid"/);
        assert.equal((html.match(/class="blog-card"/g) ?? []).length, ARTICLES.length);
      }
      if (route === 'lab') assert.match(html, /id="start-test"/);
      assert.equal(html.includes('href="#providers"'), false);
      const toggle = htmlValue(html, /class="language-button" href="([^"]+)"/);
      assert.equal(new URL(toggle, `${siteUrl}/${currentRoute}`).pathname, `/project-site/${language === 'en' ? '' : 'en/'}${route}/`);
    }
  }
  for (const article of ARTICLES) {
    for (const language of ['zh', 'en']) {
      const currentRoute = `${language === 'en' ? 'en/' : ''}article/${article.id}/`;
      const html = await readFile(resolve(localRoot, currentRoute, 'index.html'), 'utf8');
      assert.match(html, /class="article-reader"/);
      assert.ok(html.includes(language === 'en' ? article.title.en : article.title.zh));
    }
  }
});

test('all profiles have unique titles and descriptions, static content, reciprocal language links and honest schema', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const provider of PROVIDERS) {
    for (const language of ['zh', 'en']) {
      const route = `${language === 'en' ? 'en/' : ''}providers/${provider.id}/`;
      const alternateRoute = `${language === 'en' ? '' : 'en/'}providers/${provider.id}/`;
      const html = await readFile(resolve(localRoot, route, 'index.html'), 'utf8');
      const documentUrl = `${siteUrl}/${route}`;
      const title = htmlValue(html, /<title>([^<]+)<\/title>/);
      const description = htmlValue(html, /name="description" content="([^"]+)"/);
      assert.equal(title, getProviderSeo(provider).title[language]);
      assert.equal(description, getProviderSeo(provider).description[language]);
      titles.add(title);
      descriptions.add(description);
      assert.equal((html.match(/<h1>/g) ?? []).length, 1);
      assert.ok(html.includes(getProviderSeo(provider).analysis[language].replaceAll("'", "&#39;")));
      const toggle = htmlValue(html, /class="language-button" href="([^"]+)"/);
      assert.equal(new URL(toggle, documentUrl).href, `${siteUrl}/${alternateRoute}`);
      for (const match of html.matchAll(/<a[^>]*href="(https?:[^"]+)"/g)) assert.equal(new URL(match[1]).protocol, 'https:');
      for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
        const url = new URL(match[1], documentUrl);
        if (url.origin === new URL(siteUrl).origin) assert.ok(url.pathname.startsWith('/project-site/'), `${route} -> ${url.pathname}`);
      }
      const schema = JSON.parse(htmlValue(html, /<script type="application\/ld\+json">([^<]+)<\/script>/));
      assert.equal(schema['@type'], 'Article');
      assert.equal(schema.inLanguage, language === 'en' ? 'en' : 'zh-CN');
      assert.equal(schema.dateModified, provider.verified);
      assert.equal(schema.aggregateRating, undefined);
      assert.equal(schema.reviewRating, undefined);
      assert.equal(schema.mainEntityOfPage, undefined);
    }
  }
  assert.equal(titles.size, PROVIDERS.length * 2);
  assert.equal(descriptions.size, PROVIDERS.length * 2);
});

test('production URLs produce self canonicals, reciprocal hreflang and one stable Chinese default', async () => {
  for (const route of ['', ...PROVIDERS.map(provider => `providers/${provider.id}/`)]) {
    for (const language of ['zh', 'en']) {
      const currentRoute = `${language === 'en' ? 'en/' : ''}${route}`;
      const html = await readFile(resolve(productionRoot, currentRoute, 'index.html'), 'utf8');
      assert.equal(htmlValue(html, /rel="canonical" href="([^"]+)"/), `${siteUrl}/${currentRoute}`);
      assert.equal(htmlValue(html, /hreflang="zh-CN" href="([^"]+)"/), `${siteUrl}/${route}`);
      assert.equal(htmlValue(html, /hreflang="en" href="([^"]+)"/), `${siteUrl}/en/${route}`);
      assert.equal(htmlValue(html, /hreflang="x-default" href="([^"]+)"/), `${siteUrl}/${route}`);
    }
  }
  const sitemap = await readFile(resolve(productionRoot, 'sitemap.xml'), 'utf8');
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  assert.equal(locations.length, 10 + ARTICLES.length * 2 + PROVIDERS.length * 2);
  assert.equal(new Set(locations).size, locations.length);
  assert.ok(locations.every(location => location.startsWith(`${siteUrl}/`)));
  assert.match(await readFile(resolve(productionRoot, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/cdn-bench\.test\/project-site\/sitemap.xml/);
});

test('rebuilds are deterministic and local builds remove stale production-only sitemap', async () => {
  const initial = await readFile(resolve(localRoot, 'en/index.html'), 'utf8');
  await buildPages({ outputRoot: localRoot, siteUrl: '' });
  assert.equal(await readFile(resolve(localRoot, 'en/index.html'), 'utf8'), initial);
  await buildPages({ outputRoot: productionRoot, siteUrl: '' });
  await assert.rejects(stat(resolve(productionRoot, 'sitemap.xml')), { code: 'ENOENT' });
  assert.ok(!(await readFile(resolve(productionRoot, 'providers/yewsafe/index.html'), 'utf8')).includes('rel="canonical"'));
});

test('site root validation rejects non-web URLs, credentials and accidental query or fragment', () => {
  assert.equal(normalizeSiteUrl('https://cdn-bench.test/project-site///'), siteUrl);
  assert.equal(normalizeSiteUrl(''), '');
  for (const invalid of ['javascript:alert(1)', 'https://user:secret@cdn-bench.test/', 'https://cdn-bench.test/?preview=1', 'https://cdn-bench.test/#providers']) assert.throws(() => normalizeSiteUrl(invalid));
});
