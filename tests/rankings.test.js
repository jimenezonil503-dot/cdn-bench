import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { PROVIDERS } from '../content.js';
import { demoResponse, orderedProviders, renderRankings } from '../tools/rankings.mjs';

test('homepage index renders response-time UI and preserves the requested editorial top five', async () => {
  assert.ok(PROVIDERS.length > 60);
  const firstFive = ['cloudflare', 'yewsafe', 'akamai', 'fastly', 'cdn5'];
  assert.deepEqual(orderedProviders(PROVIDERS).slice(0, 5).map(item => item.id), firstFive);
  for (const language of ['zh', 'en']) {
    const html = renderRankings(PROVIDERS, language);
    const ids = [...html.matchAll(/data-ranking-id="([^"]+)"/g)].map(match => match[1]);
    assert.equal(ids.length, PROVIDERS.length);
    assert.equal(new Set(ids).size, PROVIDERS.length);
    assert.deepEqual(ids.slice(0, 5), firstFive);
    const times = [...html.matchAll(/data-response-ms="([^"]+)"/g)].map(match => Number(match[1]));
    assert.equal(times.length, PROVIDERS.length);
    assert.ok(times.every(value => Number.isFinite(value) && value > 0 && value < 300));
    assert.equal((html.match(/class="ranking-meter"/g) ?? []).length, PROVIDERS.length);
    assert.ok(!/ranking-unmeasured|ranking-demo|演示数据|演示预览|DEMO PREVIEW|Demo data|待实测/.test(html));
    assert.ok(html.includes(language === 'en' ? 'Editorial order' : '编辑排序'));
    assert.equal((html.match(/data-ranking-filter=/g) ?? []).length, 5);
    const home = await readFile(new URL(language === 'en' ? '../en/index.html' : '../index.html', import.meta.url), 'utf8');
    assert.ok(home.includes('id="cdn-rankings"'));
    assert.equal((home.match(/data-response-ms=/g) ?? []).length, PROVIDERS.length);
    assert.ok(home.includes(language === 'en' ? 'href="../rankings.css"' : 'href="./rankings.css"'));
    const base = 'https://example.test/project/' + (language === 'en' ? 'en/' : '');
    for (const match of html.matchAll(/href="(\.\/providers\/[^"#]+)"/g)) {
      const url = new URL(match[1], base);
      assert.ok(url.pathname.startsWith('/project/' + (language === 'en' ? 'en/' : '') + 'providers/'));
      await readFile(new URL('../' + url.pathname.slice('/project/'.length) + 'index.html', import.meta.url));
    }
  }
});

test('response fixtures remain stable through filtering and do not change provider facts', () => {
  const before = JSON.stringify(PROVIDERS);
  const full = renderRankings(PROVIDERS, 'zh');
  for (const provider of PROVIDERS) {
    const sample = demoResponse(provider.id);
    assert.deepEqual(demoResponse(provider.id), sample);
    const single = renderRankings([provider], 'en');
    const value = 'data-response-ms="' + sample.milliseconds.toFixed(1) + '"';
    assert.ok(full.includes(value));
    assert.ok(single.includes(value));
    assert.ok(sample.width > 0 && sample.width <= 100);
  }
  assert.ok(Number.isFinite(demoResponse('__proto__').milliseconds));
  assert.ok(Number.isFinite(demoResponse('constructor').milliseconds));
  assert.equal(JSON.stringify(PROVIDERS), before);
});

test('editorial ordering tolerates admin removals and escapes untrusted provider fields', () => {
  const rows = PROVIDERS.filter(provider => provider.id !== 'yewsafe');
  assert.deepEqual(orderedProviders(rows).slice(0, 4).map(provider => provider.id), ['cloudflare', 'akamai', 'fastly', 'cdn5']);
  assert.equal((renderRankings([], 'zh').match(/data-ranking-id=/g) ?? []).length, 0);
  const item = structuredClone(PROVIDERS[0]);
  item.name = '<img src=x onerror=alert(1)>';
  item.tagline.zh = '" onclick="alert(1)';
  const html = renderRankings([item], 'zh');
  assert.ok(html.includes('&lt;img'));
  assert.ok(!html.includes('<img src=x'));
  assert.ok(!html.includes('" onclick="alert(1)'));
});

test('search, category filtering, expand, collapse and empty results preserve editorial order', async () => {
  const source = (await readFile(new URL('../site-shell.js', import.meta.url), 'utf8')).split('const rankings =')[1];
  function control(dataset = {}) {
    return { dataset, value: '', hidden: false, textContent: '', attributes: {}, handlers: {}, addEventListener(name, fn) { this.handlers[name] = fn; }, setAttribute(name, value) { this.attributes[name] = value; } };
  }
  for (const english of [false, true]) {
    const rows = orderedProviders(PROVIDERS).map(provider => control({ search: [provider.name, provider.tagline.zh, provider.tagline.en, provider.bestFor.zh, provider.bestFor.en].join(' ').toLocaleLowerCase(), categories: provider.categories.join(' '), rankingId: provider.id }));
    const filters = ['all', 'delivery', 'security', 'programmable', 'cloud'].map(value => control({ rankingFilter: value }));
    const search = control(), more = control(), count = control(), empty = control();
    const map = { '#ranking-search': search, '#ranking-more': more, '#ranking-count': count, '.ranking-empty': empty };
    const root = { scrollIntoView() {}, querySelector(key) { return map[key]; }, querySelectorAll(key) { return key === '.ranking-row' ? rows : filters; } };
    vm.runInNewContext('const rankings =' + source, { english, document: { querySelector() { return root; } } });
    const visible = () => rows.filter(row => !row.hidden);
    assert.equal(visible().length, 15);
    more.handlers.click();
    assert.equal(visible().length, PROVIDERS.length);
    assert.equal(more.attributes['aria-expanded'], 'true');
    more.handlers.click();
    assert.equal(visible().length, 15);
    search.value = '  YeWSaFe  ';
    search.handlers.input();
    assert.equal(visible().length, 1);
    assert.equal(visible()[0].dataset.rankingId, 'yewsafe');
    assert.equal(more.hidden, true);
    search.value = '';
    search.handlers.input();
    filters[2].handlers.click();
    assert.ok(visible().every(row => row.dataset.categories.includes('security')));
    assert.equal(filters[2].attributes['aria-pressed'], 'true');
    search.value = 'no-provider-matches-this';
    search.handlers.input();
    assert.equal(visible().length, 0);
    assert.equal(empty.hidden, false);
    search.value = '';
    search.handlers.input();
    filters[0].handlers.click();
    assert.equal(visible().length, 15);
    assert.equal(empty.hidden, true);
  }
});
