import { copyFile, mkdir, mkdtemp, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTICLES, PROVIDERS } from '../content.js';
import { DEFAULT_ENDPOINTS } from '../benchmark.js';
import { advertisingSettings } from '../site-settings.js';
import { buildPages, normalizeSiteUrl } from './build-pages.mjs';
import { isAdImagePath, publicAdvertising } from './advertising.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const publicFiles = [
  '.nojekyll', 'styles.css', 'platform.css', 'platform-overrides.css', 'homepage.css',
  'rankings.css', 'provider-page.css', 'navigation.css', 'site-shell.js',
  'site-settings.js', 'app.js', 'platform.js', 'article-links.js', 'content.js',
  'editorial/articles-2026.js', 'admin-overrides.js', 'benchmark.js', 'i18n.js',
  'favicon.svg', 'advertising.js', 'advertising.css',
];
const sections = ['', 'providers/', 'blog/', 'lab/', 'methodology/'];
const routes = [
  ...sections.flatMap(route => [route, 'en/' + route]),
  ...PROVIDERS.flatMap(item => [`providers/${item.id}/`, `en/providers/${item.id}/`]),
  ...ARTICLES.flatMap(item => [`article/${item.id}/`, `en/article/${item.id}/`]),
];

const escapeHtml = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

async function writeLegacyRedirects(destination, siteUrl) {
  // The original project site used /cdn-bench/. Keep every published route usable
  // when the same site is deployed at the account root.
  if (new URL(siteUrl).pathname !== '/') return 0;
  await writeFile(resolve(destination, 'legacy-redirect.js'), `const target = new URL(document.currentScript.dataset.destination, location.origin);
target.search = location.search;
target.hash = location.hash;
location.replace(target.href);
`);
  for (const route of routes) {
    const english = route.startsWith('en/');
    const target = `${siteUrl}/${route}`;
    const label = english ? 'Continue to this page' : '继续访问此页面';
    const title = english ? 'Opening page · CDN Bench' : '正在打开页面 · CDN Bench';
    const html = `<!doctype html>
<html lang="${english ? 'en' : 'zh-CN'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><link rel="canonical" href="${escapeHtml(target)}"><script src="/legacy-redirect.js" data-destination="${escapeHtml(target)}"></script><meta http-equiv="refresh" content="0;url=${escapeHtml(target)}"><title>${title}</title></head><body><main><p><a href="${escapeHtml(target)}">${label} →</a></p></main></body></html>\n`;
    const filename = resolve(destination, 'cdn-bench', route, 'index.html');
    await mkdir(dirname(filename), { recursive: true });
    await writeFile(filename, html);
  }
  return routes.length;
}

export async function exportPages({ outputRoot, siteUrl }) {
  const destination = resolve(outputRoot);
  const normalizedUrl = normalizeSiteUrl(siteUrl);
  if (!normalizedUrl) throw new Error('SITE_URL is required for the online export.');
  await mkdir(destination, { recursive: true });
  if ((await readdir(destination)).length) throw new Error('The export directory must be empty.');
  await buildPages({ outputRoot: destination, siteUrl: normalizedUrl });
  const assets = new Set(publicFiles);
  for (const item of [...PROVIDERS, ...DEFAULT_ENDPOINTS]) if (item.logo?.startsWith('assets/')) assets.add(item.logo);
  for (const article of ARTICLES) for (const section of article.sections) for (const figure of section.figures ?? []) assets.add(figure.src);
  for (const ad of Object.values(publicAdvertising(advertisingSettings)).flatMap(slots => Object.values(slots))) {
    for (const image of [ad.image, ad.mobileImage]) if (isAdImagePath(image)) assets.add(image);
  }
  for (const path of assets) {
    const source = resolve(root, path);
    const safePath = relative(root, source);
    if (isAbsolute(safePath) || safePath.startsWith('..')) throw new Error('Invalid public asset path.');
    const target = resolve(destination, safePath);
    await mkdir(dirname(target), { recursive: true });
    await copyFile(source, target);
  }
  const settingsPath = resolve(destination, 'site-settings.js');
  await writeFile(settingsPath, `export const contactSettings = null;\nexport const advertisingSettings = ${JSON.stringify(publicAdvertising(advertisingSettings)).replaceAll('<', '\\u003c')};\n`);
  const redirects = await writeLegacyRedirects(destination, normalizedUrl);
  return { pages: routes.length, assets: assets.size, redirects };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const staging = await mkdtemp(resolve(root, '.pages-build-'));
  const destination = resolve(root, '_site');
  try {
    const result = await exportPages({ outputRoot: staging, siteUrl: process.env.SITE_URL });
    if (dirname(destination) !== resolve(root)) throw new Error('Invalid export destination.');
    await rm(destination, { recursive: true, force: true });
    await rename(staging, destination);
    console.log(`Exported ${result.pages} pages, ${result.assets} assets and ${result.redirects} legacy redirects to _site.`);
  } finally {
    if (dirname(staging) !== resolve(root)) throw new Error('Invalid export staging directory.');
    await rm(staging, { recursive: true, force: true });
  }
}
