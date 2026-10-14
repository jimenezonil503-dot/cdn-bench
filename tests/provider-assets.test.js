import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { PROVIDERS, filterProviders } from '../platform.js';
import { renderRankings } from '../tools/rankings.mjs';

test('requested providers resolve by name and full domain in the directory and homepage', () => {
  for (const [id, domain] of [['cdn07', 'cdn07.com'], ['stonecdn', 'stonecdn.com']]) {
    const row = PROVIDERS.find(p => p.id === id);
    assert.ok(row);
    assert.ok(filterProviders(domain).some(p => p.id === id));
    assert.ok(filterProviders(row.name.toUpperCase()).some(p => p.id === id));
    for (const language of ['zh', 'en']) assert.ok(renderRankings([row], language).includes(domain));
  }
});

test('every listed brand uses a traceable local official image without synthetic initial placeholders', async () => {
  const sources = JSON.parse(await readFile(new URL('../assets/logos/sources.json', import.meta.url), 'utf8'));
  assert.equal(new Set(sources.map(s => s.id)).size, PROVIDERS.length);
  for (const provider of PROVIDERS) {
    const source = sources.find(s => s.id === provider.id);
    assert.ok(source, provider.id);
    assert.equal(source.file, provider.logo);
    assert.equal(new URL(source.sourceUrl).protocol, 'https:');
    const image = await readFile(new URL('../' + provider.logo, import.meta.url));
    assert.equal(createHash('sha256').update(image).digest('hex'), source.sha256, provider.id);
    if (provider.logo.endsWith('.svg')) {
      const svg = image.toString();
      assert.match(svg, /<svg\b/);
      assert.doesNotMatch(svg, /<script\b|<foreignObject\b|\bon[a-z]+\s*=/i);
      assert.doesNotMatch(svg, /fill="#edf3e8"|font-family="Arial,sans-serif" font-size="23"/);
    } else {
      const signature = image.subarray(0,12);
      assert.ok(signature.subarray(0,8).toString('hex') === '89504e470d0a1a0a' || signature.subarray(0,3).toString('hex') === 'ffd8ff' || signature.toString().startsWith('RIFF'), provider.id);
    }
  }
});
