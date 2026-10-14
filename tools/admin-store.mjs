import { cp, mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { AdminError, publicContent, seedContent, validateContent } from './admin-content.mjs';
import { publicAdvertising, isAdImagePath } from './advertising.mjs';

const runFile = promisify(execFile);
const sections = ['providers', 'blog', 'lab', 'methodology'];

async function readOptional(filename) {
  try { return await readFile(filename); } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

async function replaceFile(filename, body) {
  if (body === null) {
    await rm(filename, { force: true });
    return;
  }
  await mkdir(dirname(filename), { recursive: true });
  const temporary = `${filename}.admin-new`;
  try {
    await writeFile(temporary, body, { mode: 0o600 });
    await rename(temporary, filename);
  } finally {
    await rm(temporary, { force: true });
  }
}

function pageFiles(content) {
  return ['index.html', 'en/index.html', ...sections.flatMap(section => [`${section}/index.html`, `en/${section}/index.html`]),
    ...content.providers.flatMap(item => [`providers/${item.id}/index.html`, `en/providers/${item.id}/index.html`]),
    ...content.articles.flatMap(item => [`article/${item.id}/index.html`, `en/article/${item.id}/index.html`]),
    'sitemap.xml', 'robots.txt', 'admin-overrides.js', 'site-settings.js'];
}

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export class AdminStore {
  constructor(rootDirectory, providers, articles) {
    this.root = rootDirectory;
    this.directory = resolve(rootDirectory, '.admin');
    this.initial = seedContent(providers, articles);
    this.busy = false;
    this.publishing = null;
    this.ready = this.initialize();
  }

  async initialize() {
    const draftFile = await readOptional(resolve(this.directory, 'content.json'));
    const publishedFile = await readOptional(resolve(this.directory, 'published.json'));
    const saved = draftFile ? JSON.parse(draftFile) : null;
    this.draft = saved ? { ...saved, ...validateContent(saved) } : { ...this.initial, revision: 0, savedAt: null, publishedAt: null, publishedRevision: 0 };
    const published = publishedFile ? JSON.parse(publishedFile) : null;
    this.published = published ? publicContent(validateContent(published)) : publicContent(this.initial);
  }

  async getData() {
    await this.ready;
    return structuredClone(this.draft);
  }

  async save(value) {
    await this.ready;
    if (this.busy) throw new AdminError(409, '正在保存或发布，请稍后重试。');
    if (value.revision !== this.draft.revision) throw new AdminError(409, '内容已被其他管理页面修改，请重新载入后再保存。');
    this.busy = true;
    try {
      const content = validateContent(value);
      const next = { ...this.draft, ...content, revision: this.draft.revision + 1, savedAt: new Date().toISOString() };
      await replaceFile(resolve(this.directory, 'content.json'), json(next));
      this.draft = next;
      return structuredClone(next);
    } finally {
      this.busy = false;
    }
  }

  async publish(revision) {
    await this.ready;
    if (this.busy) throw new AdminError(409, '正在保存或发布，请稍后重试。');
    if (revision !== this.draft.revision) throw new AdminError(409, '内容版本已变化，请重新载入后再发布。');
    this.busy = true;
    const operation = this.performPublish();
    this.publishing = operation.catch(() => {});
    try { return await operation; } finally {
      this.busy = false;
      this.publishing = null;
    }
  }

  async performPublish() {
    await mkdir(this.directory, { recursive: true });
    const staging = await mkdtemp(resolve(this.directory, 'publish-'));
    const previousFiles = new Map();
    const installed = [];
    try {
      const published = publicContent(validateContent(this.draft));
      const moduleSource = `export const providerOverrides = ${JSON.stringify(published.providers)};\nexport const articleOverrides = ${JSON.stringify(published.articles)};\n`;
      const sources = ['content.js', 'editorial/articles-2026.js', 'platform.js', 'article-links.js', 'seo-content.js', 'i18n.js', 'benchmark.js', 'tools/build-pages.mjs', 'tools/homepage.mjs', 'tools/rankings.mjs', 'tools/site-shell.mjs', 'tools/contact.mjs', 'tools/advertising.mjs', 'tools/templates'];
      for (const source of sources) {
        const target = resolve(staging, source);
        await mkdir(dirname(target), { recursive: true });
        await cp(resolve(this.root, source), target, { recursive: true });
      }
      await writeFile(resolve(staging, 'package.json'), '{"type":"module"}\n');
      await writeFile(resolve(staging, 'admin-overrides.js'), moduleSource);
      await writeFile(resolve(staging, 'site-settings.js'), `export const contactSettings = ${JSON.stringify(published.contact).replaceAll('<', '\\u003c')};\nexport const advertisingSettings = ${JSON.stringify(publicAdvertising(published.advertising)).replaceAll('<', '\\u003c')};\n`);
      for (const ad of Object.values(published.advertising).flatMap(slots => Object.values(slots))) {
        for (const image of ad.type === 'image' ? [ad.image, ad.mobileImage] : []) if (isAdImagePath(image)) {
          try { if (!(await stat(resolve(this.root, image))).isFile()) throw new Error('Not a file'); }
          catch { throw new AdminError(400, '广告图片不存在，请重新上传后发布。'); }
        }
      }
      for (const item of published.providers) {
        if (item.logo.startsWith('assets/')) {
          try { await stat(resolve(this.root, item.logo)); } catch { throw new AdminError(400, `商家 ${item.name} 的本地 Logo 不存在。`); }
        }
      }
      for (const article of published.articles) for (const section of article.sections) for (const figure of section.figures ?? []) {
        try { const info = await stat(resolve(this.root, figure.src)); if (!info.isFile()) throw new Error('Not a file'); }
        catch { throw new AdminError(400, '文章 ' + article.id + ' 的本地图示不存在：' + figure.src); }
      }
      const environment = { ...process.env };
      delete environment.ADMIN_PASSWORD;
      delete environment.ADMIN_USERNAME;
      await runFile(process.execPath, [resolve(staging, 'tools/build-pages.mjs')], { cwd: staging, timeout: 60000, maxBuffer: 1024 * 1024, env: environment, windowsHide: true });
      const paths = new Set([...pageFiles(this.published), ...pageFiles(published)]);
      const next = { ...this.draft, publishedAt: new Date().toISOString(), publishedRevision: this.draft.revision };
      const updates = [];
      for (const path of paths) updates.push([resolve(this.root, path), await readOptional(resolve(staging, path))]);
      updates.push([resolve(this.directory, 'published.json'), json({ ...published, revision: next.revision, publishedAt: next.publishedAt })]);
      updates.push([resolve(this.directory, 'content.json'), json(next)]);
      for (const [filename, body] of updates) {
        previousFiles.set(filename, await readOptional(filename));
        installed.push(filename);
        await replaceFile(filename, body);
      }
      this.draft = next;
      this.published = published;
      return structuredClone(next);
    } catch (error) {
      for (const filename of installed.reverse()) await replaceFile(filename, previousFiles.get(filename));
      if (error instanceof AdminError) throw error;
      console.error('Admin publish failed:', error.message);
      throw new AdminError(500, '发布失败，已保留之前的公开内容；请检查服务日志后重试。');
    } finally {
      if (dirname(staging) !== this.directory) throw new Error('Invalid publish workspace.');
      await rm(staging, { recursive: true, force: true });
    }
  }
}
