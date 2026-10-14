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
  return { pages: routes.length, assets: assets.size };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const staging = await mkdtemp(resolve(root, '.pages-build-'));
  const destination = resolve(root, '_site');
  try {
    const result = await exportPages({ outputRoot: staging, siteUrl: process.env.SITE_URL });
    if (dirname(destination) !== resolve(root)) throw new Error('Invalid export destination.');
    await rm(destination, { recursive: true, force: true });
    await rename(staging, destination);
    console.log(`Exported ${result.pages} pages and ${result.assets} assets to _site.`);
  } finally {
    if (dirname(staging) !== resolve(root)) throw new Error('Invalid export staging directory.');
    await rm(staging, { recursive: true, force: true });
  }
}
