import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { extname, isAbsolute, relative, resolve } from 'node:path';
import { ARTICLES, PROVIDERS } from '../content.js';
import { DEFAULT_ENDPOINTS } from '../benchmark.js';
import { createAdminApi } from './admin-api.mjs';
import { AdminStore } from './admin-store.mjs';
import { ContactSubmissionStore, createContactApi } from './contact-submissions.mjs';
import { adIsActive, isAdImagePath, publicAdvertising, replaceAdvertising } from './advertising.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = Number(process.env.PORT ?? 4317);
const baseRoutes = ['en', 'providers', 'en/providers', 'blog', 'en/blog', 'lab', 'en/lab', 'methodology', 'en/methodology', 'admin'];
const baseFiles = ['index.html', 'styles.css', 'platform.css', 'platform-overrides.css', 'homepage.css', 'rankings.css', 'provider-page.css', 'navigation.css', 'contact.css', 'site-shell.js', 'site-settings.js', 'app.js', 'platform.js', 'article-links.js', 'content.js', 'editorial/articles-2026.js', 'admin-overrides.js', 'benchmark.js', 'i18n.js', 'favicon.svg', 'sitemap.xml', 'robots.txt', 'admin/index.html', 'admin/admin.js', 'admin/admin.css'];
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8' };

export function createPreviewServer({ rootDirectory = root, adminCredentials, secureCookie, adminOrigin } = {}) {
  const store = new AdminStore(rootDirectory, PROVIDERS, ARTICLES);
  const submissions = new ContactSubmissionStore(rootDirectory);
  const contactApi = createContactApi({ submissions, origin: process.env.PUBLIC_ORIGIN ?? adminOrigin ?? process.env.ADMIN_ORIGIN });
  const adminApi = createAdminApi({ rootDirectory, store, submissions, credentials: adminCredentials, secureCookie, origin: adminOrigin });
  return createServer(async (request, response) => {
    try {
      const url = new URL(request.url, 'http://127.0.0.1');
      const pathname = decodeURIComponent(url.pathname);
      if (pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').includes('..')) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }
      if (pathname.startsWith('/admin/api/')) {
        await adminApi(request, response, pathname);
        return;
      }
      if (pathname === '/api/contact') { await contactApi(request, response); return; }
      if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.writeHead(405, { Allow: 'GET, HEAD' });
        response.end('Method not allowed');
        return;
      }
      await store.ready;
      if (store.publishing) await store.publishing;
      const { providers, articles, advertising } = store.published;
      const directoryRoutes = new Set([...baseRoutes, ...articles.flatMap(item => [`article/${item.id}`, `en/article/${item.id}`]), ...providers.flatMap(item => [`providers/${item.id}`, `en/providers/${item.id}`])]);
      const publicFiles = new Set([...baseFiles, ...[...directoryRoutes].map(route => `${route}/index.html`), ...[...providers, ...DEFAULT_ENDPOINTS].map(item => item.logo)]);
      for (const article of articles) for (const section of article.sections) for (const figure of section.figures ?? []) publicFiles.add(figure.src);
      publicFiles.add('advertising.js');
      publicFiles.add('contact-submit.js');
      publicFiles.add('advertising.css');
      for (const ad of Object.values(advertising).flatMap(slots => Object.values(slots))) if (adIsActive(ad) && ad.type === 'image') {
        for (const image of [ad.image, ad.mobileImage]) if (isAdImagePath(image)) publicFiles.add(image);
      }
      if (directoryRoutes.has(pathname.slice(1))) {
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` });
        response.end();
        return;
      }
      const requested = pathname === '/' ? 'index.html' : pathname.slice(1).replace(/\/$/, '/index.html');
      const filename = resolve(rootDirectory, requested);
      const relativePath = relative(rootDirectory, filename).replaceAll('\\', '/');
      if (isAbsolute(relativePath) || relativePath.startsWith('../') || !publicFiles.has(relativePath)) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }
      const resolvedPath = relative(await realpath(rootDirectory), await realpath(filename));
      if (isAbsolute(resolvedPath) || resolvedPath.startsWith('..')) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }
      let body = await readFile(filename);
      if (extname(filename) === '.html' && !relativePath.startsWith('admin/')) {
        const depth = relativePath.split('/').length - 1;
        body = Buffer.from(replaceAdvertising(body.toString('utf8'), advertising, relativePath.startsWith('en/') ? 'en' : 'zh', depth ? '../'.repeat(depth) : './'));
      } else if (relativePath === 'site-settings.js') {
        body = Buffer.from(`export const contactSettings = ${JSON.stringify(store.published.contact).replaceAll('<', '\\u003c')};\nexport const advertisingSettings = ${JSON.stringify(publicAdvertising(advertising)).replaceAll('<', '\\u003c')};\n`);
      }
      const adminHeaders = pathname.startsWith('/admin/') ? {
        'X-Frame-Options': 'DENY', 'X-Robots-Tag': 'noindex, nofollow',
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
      } : {};
      response.writeHead(200, { 'Content-Type': extname(filename) === '.gif' ? 'image/gif' : types[extname(filename)] ?? 'application/octet-stream', 'Content-Length': body.length, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', ...adminHeaders });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch (error) {
      const status = error.code === 'ENOENT' || error.code === 'EISDIR' ? 404 : error instanceof URIError || error.code === 'ERR_INVALID_URL' ? 400 : 500;
      response.writeHead(status);
      response.end(status === 404 ? 'Not found' : status === 400 ? 'Bad request' : 'Preview error');
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createPreviewServer();
  server.on('error', error => {
    console.error(`Cannot start preview: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, '127.0.0.1', () => console.log(`CDN Bench preview: http://127.0.0.1:${port} · Admin: http://127.0.0.1:${port}/admin/`));
}
