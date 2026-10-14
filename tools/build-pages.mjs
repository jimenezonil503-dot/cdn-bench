import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { ARTICLES, PROVIDERS, articlePath } from '../platform.js';
import { getProviderSeo } from '../seo-content.js';
import { translations } from '../i18n.js';
import { renderHomepage } from './homepage.mjs';
import { renderSiteHeader } from './site-shell.mjs';
import * as siteSettings from '../site-settings.js';
import { DEFAULT_ADVERTISING, renderAdvertising } from './advertising.mjs';
import { renderArticleText, plainArticleText, articleBodyText, renderArticleExtras } from '../article-links.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const advertisingSettings = siteSettings.advertisingSettings ?? DEFAULT_ADVERTISING;

export function normalizeSiteUrl(value = '') {
  if (!value) return '';
  const parsed = new URL(value);
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.username || parsed.password || parsed.search || parsed.hash) {
    throw new Error('SITE_URL must be an HTTP(S) site root without credentials, query, or fragment.');
  }
  return parsed.href.replace(/\/+$/, '');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function absoluteUrl(path, siteUrl) {
  return siteUrl ? `${siteUrl}/${path.replace(/^\/+/, '')}` : '';
}

function localized(value, language) {
  return value?.[language] ?? '';
}

function pageLayout(language, provider) {
  const english = language === 'en';
  const rootPrefix = english ? '../../../' : '../../';
  return {
    rootPrefix,
    home: english ? '../../../en/' : '../../',
    directory: english ? '../../../en/providers/' : '../../providers/',
    blog: english ? '../../../en/blog/' : '../../blog/',
    lab: english ? '../../../en/lab/' : '../../lab/',
    logo: /^https:/.test(provider.logo) ? provider.logo : `${rootPrefix}${provider.logo}`,
    icon: `${rootPrefix}favicon.svg`,
    styles: `${rootPrefix}styles.css`,
    platformStyles: `${rootPrefix}platform.css`,
    pageStyles: `${rootPrefix}provider-page.css`,
    alternate: english ? `../../../providers/${provider.id}/` : `../../en/providers/${provider.id}/`,
    route: english ? `en/providers/${provider.id}/` : `providers/${provider.id}/`,
  };
}

function structuredData(language, provider, seo, layout, siteUrl) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: localized(seo.title, language),
    description: localized(seo.description, language),
    dateModified: provider.verified,
    inLanguage: language === 'en' ? 'en' : 'zh-CN',
    author: { '@type': 'Organization', name: 'CDN Bench' },
    publisher: { '@type': 'Organization', name: 'CDN Bench' },
  };
  const url = absoluteUrl(layout.route, siteUrl);
  if (url) data.mainEntityOfPage = url;
  return JSON.stringify(data).replaceAll('<', '\\u003c');
}

function metaLinks(language, route, alternateRoute, siteUrl) {
  if (!siteUrl) return '';
  const alternateLanguage = language === 'en' ? 'zh-CN' : 'en';
  const currentUrl = absoluteUrl(route, siteUrl);
  const alternateUrl = absoluteUrl(alternateRoute, siteUrl);
  const defaultUrl = language === 'en' ? alternateUrl : currentUrl;
  return [
    `    <link rel="canonical" href="${escapeHtml(currentUrl)}">`,
    `    <link rel="alternate" hreflang="${language === 'en' ? 'en' : 'zh-CN'}" href="${escapeHtml(currentUrl)}">`,
    `    <link rel="alternate" hreflang="${alternateLanguage}" href="${escapeHtml(alternateUrl)}">`,
    `    <link rel="alternate" hreflang="x-default" href="${escapeHtml(defaultUrl)}">`,
  ].join('\n');
}

function providerPage(provider, language, siteUrl) {
  const seo = getProviderSeo(provider);
  const english = language === 'en';
  const layout = pageLayout(language, provider);
  const title = localized(seo.title, language);
  const description = localized(seo.description, language);
  const heading = english ? `${provider.name} CDN review and selection guide` : `${provider.name} CDN 评测与选型指南`;
  const directoryLabel = english ? 'Provider directory' : 'CDN 厂商目录';
  const sourceLabel = english ? 'Official source' : '官方资料';
  const sourceUrl = provider.sourceUrl ?? provider.officialUrl;
  const related = PROVIDERS.filter(candidate => candidate.id !== provider.id)
    .sort((first, second) => second.categories.filter(category => provider.categories.includes(category)).length - first.categories.filter(category => provider.categories.includes(category)).length)
    .slice(0, 3);
  const languageLabel = english ? '中文' : 'EN';
  const languageAria = english ? 'Read this profile in Chinese' : 'Read this profile in English';
  const nav = english
    ? { providers: 'Providers', blog: 'Blog', lab: 'Benchmark', back: 'Back to directory', official: 'Visit official site ↗', test: 'Prepare a real workload test ↗', overview: 'Overview', capabilities: 'Public capabilities', fit: 'Best-fit workloads', analysis: 'Editorial analysis', questions: 'Questions to confirm', boundary: 'Measurement boundary', related: 'Related provider profiles', updated: 'Sources consulted', checked: 'Not an independent performance ranking.', public: 'Public product information is summarized from official materials.' }
    : { providers: 'CDN 厂商', blog: '博客', lab: '实测工具', back: '返回厂商目录', official: '访问官方网站 ↗', test: '准备真实业务实测 ↗', overview: '产品定位', capabilities: '公开产品能力', fit: '适用场景', analysis: '编辑解读', questions: '决策前需要确认', boundary: '实测边界', related: '相关厂商详情', updated: '资料查阅', checked: '不是独立性能排名。', public: '内容依据厂商公开资料整理。' };
  const measurement = english
    ? 'This profile explains product positioning and selection questions. It does not claim a global speed, uptime, security, or price ranking. To measure this provider, deploy the same public HTTPS file with CORS and test it from the locations that matter to your users.'
    : '本详情页用于解释产品定位与选型问题，不代表全球速度、可用性、防护能力或价格排名。若要测量该厂商，请部署同一份允许 CORS 的公开 HTTPS 文件，并从你的真实用户地区进行测试。';
  const body = english
    ? `    <p class="provider-kicker">CDN PROVIDER PROFILE / ${escapeHtml(provider.name.toUpperCase())}</p>`
    : `    <p class="provider-kicker">CDN 厂商详情 / ${escapeHtml(provider.name)}</p>`;
  const capabilityItems = provider.highlights.map(item => `          <li>${escapeHtml(localized(item, language))}</li>`).join('\n');
  const questionItems = seo.questions.map(item => `          <li>${escapeHtml(localized(item, language))}</li>`).join('\n');
  const relatedCards = related.map(candidate => `
          <a class="related-provider" href="../${escapeHtml(candidate.id)}/">
             <span class="related-logo${candidate.logoDark ? ' logo-dark' : ''}"><img src="${escapeHtml(/^https:/.test(candidate.logo) ? candidate.logo : `${layout.rootPrefix}${candidate.logo}`)}" alt="${escapeHtml(candidate.name)} logo" width="58" height="34" loading="lazy"></span>
            <span><strong>${escapeHtml(candidate.name)}</strong><small>${escapeHtml(localized(candidate.tagline, language))}</small></span>
          </a>`).join('');
  const jsonLd = structuredData(language, provider, seo, layout, siteUrl);
  const alternateRoute = english ? `providers/${provider.id}/` : `en/providers/${provider.id}/`;

  return `<!doctype html>
<html lang="${english ? 'en' : 'zh-CN'}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#153d32">
    <meta name="robots" content="index,follow">
    <meta name="description" content="${escapeHtml(description)}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:site_name" content="CDN Bench">
    <title>${escapeHtml(title)}</title>
${metaLinks(language, layout.route, alternateRoute, siteUrl)}
    <link rel="icon" href="${escapeHtml(layout.icon)}" type="image/svg+xml">
    <link rel="stylesheet" href="${escapeHtml(layout.styles)}">
    <link rel="stylesheet" href="${escapeHtml(layout.platformStyles)}">
    <link rel="stylesheet" href="${escapeHtml(layout.pageStyles)}">
    <link rel="stylesheet" href="${escapeHtml(layout.rootPrefix)}navigation.css">
    <link rel="stylesheet" href="${escapeHtml(layout.rootPrefix)}advertising.css">
    <script src="${escapeHtml(layout.rootPrefix)}advertising.js" defer></script>
    <script src="${escapeHtml(layout.rootPrefix)}site-shell.js" defer></script>
    <script type="application/ld+json">${jsonLd}</script>
  </head>
  <body class="provider-page">
    <a class="skip-link" href="#main">${english ? 'Skip to content' : '跳到主要内容'}</a>
    ${renderSiteHeader({ language, rootPrefix: layout.rootPrefix, route: layout.route, alternateRoute })}
    ${renderAdvertising(advertisingSettings, language, layout.rootPrefix)}
    <main id="main" class="provider-main">
      <nav class="provider-breadcrumb" aria-label="${english ? 'Breadcrumb' : '面包屑导航'}"><a href="${escapeHtml(layout.home)}">CDN Bench</a><span aria-hidden="true">/</span><a href="${escapeHtml(layout.directory)}">${directoryLabel}</a><span aria-hidden="true">/</span><strong>${escapeHtml(provider.name)}</strong></nav>
      <article class="provider-article">
        <header class="provider-hero">
${body}
          <div class="provider-identity">
            <span class="provider-page-logo${provider.logoDark ? ' logo-dark' : ''}"><img src="${escapeHtml(layout.logo)}" alt="${escapeHtml(provider.name)} logo" width="116" height="68"></span>
            <span class="provider-page-name">${escapeHtml(provider.name)}</span>
          </div>
          <h1>${escapeHtml(heading)}</h1>
          <p class="provider-lede">${escapeHtml(description)}</p>
          <div class="provider-hero-meta"><span>${escapeHtml(nav.updated)} · ${escapeHtml(provider.verified)}</span><span>${escapeHtml(nav.checked)}</span></div>
          <div class="provider-hero-actions"><a class="platform-primary" href="${escapeHtml(provider.officialUrl)}" target="_blank" rel="noreferrer noopener">${nav.official}</a><a class="platform-secondary" href="${escapeHtml(layout.lab)}">${nav.test}</a></div>
        </header>
        <section class="provider-section" id="overview">
          <div class="provider-section-heading"><span>01 /</span><h2>${nav.overview}</h2></div>
          <p>${escapeHtml(localized(provider.intro, language))}</p>
          <div class="provider-facts"><div><span>${english ? 'Positioning' : '交付定位'}</span><strong>${escapeHtml(localized(provider.compare.delivery, language))}</strong></div><div><span>${english ? 'Security' : '安全方向'}</span><strong>${escapeHtml(localized(provider.compare.security, language))}</strong></div><div><span>${english ? 'Onboarding' : '接入与源站'}</span><strong>${escapeHtml(localized(provider.compare.origin, language))}</strong></div></div>
        </section>
        <section class="provider-section" id="capabilities">
          <div class="provider-section-heading"><span>02 /</span><h2>${nav.capabilities}</h2></div>
          <ul class="provider-list">${capabilityItems}</ul>
        </section>
        <section class="provider-section split-section" id="fit">
          <div><div class="provider-section-heading"><span>03 /</span><h2>${nav.fit}</h2></div><p class="provider-callout">${escapeHtml(localized(provider.bestFor, language))}</p></div>
          <div><div class="provider-section-heading"><span>04 /</span><h2>${nav.analysis}</h2></div><p>${escapeHtml(localized(seo.analysis, language))}</p></div>
        </section>
        <section class="provider-section" id="questions">
          <div class="provider-section-heading"><span>05 /</span><h2>${nav.questions}</h2></div>
          <ol class="provider-list provider-questions">${questionItems}</ol>
          <div class="provider-caution"><strong>${english ? 'Watch-outs' : '风险提示'}</strong><p>${escapeHtml(localized(provider.watchouts, language))}</p></div>
        </section>
        <section class="provider-section provider-boundary" id="measurement">
          <div class="provider-section-heading"><span>06 /</span><h2>${nav.boundary}</h2></div>
          <p>${escapeHtml(measurement)}</p>
        </section>
        <footer class="provider-source"><strong>${sourceLabel}</strong><p>${escapeHtml(localized(provider.sourceLabel, language))} · ${escapeHtml(provider.verified)}</p><a href="${escapeHtml(sourceUrl)}" target="_blank" rel="noreferrer noopener">${nav.official}</a><span>${nav.public}</span></footer>
      </article>
      <aside class="provider-related" aria-labelledby="related-title"><div class="provider-section-heading"><span>MORE /</span><h2 id="related-title">${nav.related}</h2></div><div class="related-grid">${relatedCards}
      </div></aside>
    </main>
    <footer class="provider-footer"><a class="footer-brand" href="${escapeHtml(layout.home)}">CDN Bench<span> / </span>LAB</a><span>${english ? 'Built for your network. Not for the hype.' : '为真实体验而测 · 不为夸大宣传。'}</span><a href="${escapeHtml(layout.directory)}">${nav.back} ↑</a></footer>
  </body>
</html>
`;
}

function localizeEnglishIndex(source, assetPrefix = '../') {
  const html = source
    .replace('<html lang="zh-CN">', '<html lang="en">')
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(translations.en.metaDescription)}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(translations.en.title)}</title>`)
    .replace('id="language-toggle" class="language-button" href="./en/" aria-label="Switch to English">EN ↗', 'id="language-toggle" class="language-button" href="../" aria-label="Switch to Chinese">中文 ↗')
    .replace('id="summary-status">尚未开始', 'id="summary-status">Not started')
    .replace('<strong>中 / EN</strong>', '<strong>ZH / EN</strong>')
    .replace(/(href|src)="\.\/([^"]+)"/g, `$1="${assetPrefix}$2"`);
  return html.replace(/(<([a-z][\w-]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/gi, (match, opening, tag, key, current, closing) => {
    const value = translations.en[key];
    return value ? `${opening}${escapeHtml(value)}${closing}` : match;
  });
}

function directoryCards(language) {
  const prefix = './';
  const profilePrefix = language === 'en' ? './en/providers/' : './providers/';
  const labels = translations[language];
  const categoryKeys = { security: 'filterSecurity', cloud: 'filterCloud', programmable: 'filterProgrammable', delivery: 'filterDelivery' };
  return PROVIDERS.map(provider => `
        <article class="provider-card provider-tone-${escapeHtml(provider.tone)}">
          <div class="provider-card-top"><span class="provider-mark${provider.logoDark ? ' logo-dark' : ''}"><img src="${escapeHtml(/^https:/.test(provider.logo) ? provider.logo : `${prefix}${provider.logo}`)}" alt="${escapeHtml(provider.name)} logo" width="86" height="48" loading="lazy"></span><div class="provider-card-heading"><h3>${escapeHtml(provider.name)}</h3><p class="provider-tagline">${escapeHtml(localized(provider.tagline, language))}</p></div></div>
          <div class="provider-tags">${provider.categories.slice(0, 3).map(category => `<span>${escapeHtml(labels[categoryKeys[category]])}</span>`).join('')}</div>
          <p class="provider-intro">${escapeHtml(localized(provider.intro, language))}</p>
          <p class="provider-best"><strong>${language === 'en' ? 'Best for' : '适合'} · </strong>${escapeHtml(localized(provider.bestFor, language))}</p>
          <span class="provider-source-date">${language === 'en' ? 'Sources consulted' : '资料查阅'}: ${escapeHtml(provider.verified)}</span>
          <div class="provider-actions"><a class="provider-profile-button" href="${profilePrefix}${escapeHtml(provider.id)}/">${escapeHtml(labels.viewProfile)}</a><button type="button" class="compare-button" aria-pressed="false" aria-label="${escapeHtml(labels.compareNamed.replace('{name}', provider.name))}" data-provider-action="compare" data-provider-id="${escapeHtml(provider.id)}">${escapeHtml(labels.compareAdd)}</button><a class="provider-source-link" href="${escapeHtml(provider.officialUrl)}" target="_blank" rel="noreferrer noopener">${escapeHtml(labels.officialSite)}</a></div>
        </article>`).join('');
}

function homepage(source, language, siteUrl) {
  let localizedHtml = language === 'en' ? localizeEnglishIndex(source) : source;
  if (language === 'en') {
    for (const section of ['providers', 'blog', 'lab', 'methodology']) localizedHtml = localizedHtml.replaceAll('href="../' + section + '/"', 'href="./' + section + '/"');
  }
  const route = language === 'en' ? 'en/' : '';
  const alternateRoute = language === 'en' ? '' : 'en/';
  const links = metaLinks(language, route, alternateRoute, siteUrl);
  return localizedHtml
    .replace('{{SITE_HEADER}}', renderSiteHeader({ language, rootPrefix: language === 'en' ? '../' : './', route, alternateRoute }))
    .replace('{{SITE_ADS}}', () => renderAdvertising(advertisingSettings, language, language === 'en' ? '../' : './'))
    .replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, '')
    .replace('</head>', links + '\n</head>')
    .replace(/<main id="main">[\s\S]*?<\/main>/, '<main id="main">' + renderHomepage(PROVIDERS, ARTICLES, language) + '\n  </main>')
    .replace(/<aside id="compare-tray"[\s\S]*?<\/dialog>/, '');
}

async function readSiteSource() {
  const [homepageSource, sectionSource] = await Promise.all([
    readFile(resolve(root, 'tools/templates/site.html'), 'utf8'),
    readFile(resolve(root, 'tools/templates/sections.html'), 'utf8'),
  ]);
  return homepageSource.replace('</main>', `${sectionSource}\n</main>`);
}


function sectionById(source, id) {
  const match = source.match(new RegExp(`<section id="${id}"[\\s\\S]*?<\\/section>`));
  return match?.[0] ?? '';
}

function labSection(source) {
  return sectionById(source, 'lab');
}

function pageSource(source, language, { rootPrefix, route, alternateRoute, title, description, content, includeScript = true }, siteUrl) {
  source = source.replace('<body class="homepage">', '<body>').replace(/\s*<link rel="stylesheet" href="\.\/homepage\.css">/, '');
  const english = language === 'en';
  let html = language === 'en' ? localizeEnglishIndex(source, rootPrefix) : source;
  if (language !== 'en') html = html.replace(/(href|src)="\.\/([^"]+)"/g, `$1="${rootPrefix}$2"`);
  const localizedContent = english ? localizeEnglishIndex(content, rootPrefix) : content.replace(/(href|src)="\.\/([^"]+)"/g, `$1="${rootPrefix}$2"`);
  const routeDepth = route.split('/').filter(Boolean).length;
  const alternateHref = `${'../'.repeat(routeDepth)}${alternateRoute}`;
  html = html
    .replace(/\s*<link rel="(?:canonical|alternate)"[^>]*>/g, '')
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<main id="main">[\s\S]*?<\/main>/, `<main id="main">${localizedContent}\n  </main>`)
    .replace(/<aside id="compare-tray"[\s\S]*?<\/dialog>/, '');
  for (const section of ['providers', 'blog', 'lab', 'methodology']) {
    html = html.replaceAll(`${rootPrefix}${section}/`, `${rootPrefix}${english ? 'en/' : ''}${section}/`);
  }
  const homeHref = `${rootPrefix}${english ? 'en/' : ''}`;
  html = html.replace(/(class="(?:brand|footer-brand)" href=")[^"]*"/g, `$1${homeHref}"`);
  html = html.replace(/id="language-toggle" class="language-button" href="[^"]+"/, `id="language-toggle" class="language-button" href="${alternateHref}"`);
  if (!includeScript) html = html.replace(/\s*<script type="module" src="[^"]+"><\/script>/, '');
  const links = metaLinks(language, route, alternateRoute, siteUrl);
  return html.replace('{{SITE_HEADER}}', renderSiteHeader({ language, rootPrefix, route, alternateRoute })).replace('{{SITE_ADS}}', () => renderAdvertising(advertisingSettings, language, rootPrefix)).replace('</head>', `${links}\n</head>`);
}

function pageContent(source, section, language, rootPrefix) {
  const content = section === 'lab' ? labSection(source) : sectionById(source, section);
  return content.replace('{{PROVIDER_CARDS}}', directoryCards(language))
    .replace('{{BLOG_CARDS}}', blogCards(language))
    .replace('{{PROVIDER_COUNT}}', String(PROVIDERS.length))
    .replace('{{ARTICLE_COUNT}}', String(ARTICLES.length));
}

function blogCards(language) {
  const labels = translations[language];
  return ARTICLES.map(article => `<article class="blog-card"><div class="blog-meta"><span class="blog-category">${escapeHtml(localized(article.category, language))}</span><span>${escapeHtml(labels.readingTime.replace('{minutes}', article.readTime))}</span></div><a class="blog-card-link" href="./${articlePath(article.id, language)}"><h3>${escapeHtml(localized(article.title, language))}</h3><p>${escapeHtml(localized(article.excerpt, language))}</p><span class="read-more">${escapeHtml(labels.readArticle)}</span></a><span class="blog-date">${escapeHtml(article.date)}</span></article>`).join('');
}

function articleBody(article, language, rootPrefix) {
  const localizedText = value => escapeHtml(localized(value, language));
  const inline = value => renderArticleText(localized(value, language), language, rootPrefix);
  const chapters = article.sections.map((section, index) => ({ ...section, anchor: `section-${index + 1}` }));
  const sections = chapters.map(section => `<section class="article-block" id="${section.anchor}"><h2>${localizedText(section.heading)}</h2>${(section.paragraphs ?? []).map(paragraph => `<p>${inline(paragraph)}</p>`).join('')}${section.bullets?.length ? `<ul>${section.bullets.map(bullet => `<li>${inline(bullet)}</li>`).join('')}</ul>` : ''}${renderArticleExtras(section, language, rootPrefix)}</section>`).join('');
  const sources = article.sources.map(source => `<a class="article-source-link" href="${escapeHtml(source.url)}" target="_blank" rel="noreferrer noopener">${localizedText(source.label)}</a>`).join('');
  const backLabel = language === 'en' ? 'Back to blog' : '返回博客';
  const home = `${rootPrefix}${language === 'en' ? 'en/' : ''}`;
  const toc = `<nav class="article-toc" aria-label="${language === 'en' ? 'In this article' : '文章目录'}"><strong>${language === 'en' ? 'In this article' : '文章目录'}</strong><ol>${chapters.map(chapter => `<li><a href="#${chapter.anchor}">${localizedText(chapter.heading)}</a></li>`).join('')}</ol></nav>`;
  const related = `<aside class="article-related"><h2>${language === 'en' ? 'Continue reading' : '继续阅读'}</h2><ul>${ARTICLES.filter(item => item.id !== article.id).sort((a,b) => Number(b.category.zh === article.category.zh) - Number(a.category.zh === article.category.zh)).slice(0,6).map(item => `<li><a href="${rootPrefix}${articlePath(item.id, language)}">${localizedText(item.title)}</a></li>`).join('')}</ul></aside>`;
  return `<article id="article-reader" class="article-reader"><nav class="article-breadcrumb" aria-label="${language === 'en' ? 'Breadcrumb' : '面包屑导航'}"><a href="${home}">${language === 'en' ? 'Home' : '首页'}</a><span>/</span><a class="article-back" href="${home}blog/">${backLabel}</a><span>/</span><span>${localizedText(article.category)}</span></nav><header class="article-header"><span class="blog-category">${localizedText(article.category)}</span><h1>${localizedText(article.title)}</h1><p class="article-excerpt">${localizedText(article.excerpt)}</p></header><div class="article-byline"><span>${language === 'en' ? 'CDN Bench editorial' : 'CDN Bench 编辑部'} · <time datetime="${escapeHtml(article.date)}">${escapeHtml(article.date)}</time>${article.modified ? ` · ${language === 'en' ? 'Updated' : '更新'} <time datetime="${escapeHtml(article.modified)}">${escapeHtml(article.modified)}</time>` : ''}</span><span>${language === 'en' ? `${article.readTime} min read` : `约 ${article.readTime} 分钟`}</span></div>${toc}<div class="article-body">${sections}</div><aside class="article-sources"><h2>${language === 'en' ? 'Sources and editorial note' : '参考资料与编辑说明'}</h2><p>${language === 'en' ? 'Official documentation supports the technical explanations. Vendor descriptions are attributed claims; numerical examples are illustrative, not independent benchmark results.' : '技术说明依据官方文档；厂商介绍按来源标明，文中的计算和业务案例为说明性示例，不作为独立实测成绩。'}${article.modified ? ` ${language === 'en' ? 'Sources checked' : '资料核对日期'}：${escapeHtml(article.modified)}。` : ''}</p>${sources}</aside>${related}</article>`;
}

export function articleMetadata(article, language, route, siteUrl) {
  const body = articleBodyText(article, language);
  const count = language === 'zh' ? (body.match(/\p{Script=Han}/gu) ?? []).length : body.split(/\s+/).filter(Boolean).length;
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: localized(article.title, language), description: localized(article.excerpt, language), inLanguage: language === 'en' ? 'en' : 'zh-CN', datePublished: article.date, dateModified: article.modified ?? article.date, author: { '@type': 'Organization', name: 'CDN Bench 编辑部' }, publisher: { '@type': 'Organization', name: 'CDN Bench' }, articleSection: localized(article.category, language), articleBody: body, wordCount: count, citation: article.sources.map(source => source.url) };
  if (siteUrl) {
    schema.url = absoluteUrl(route, siteUrl);
    schema.mainEntityOfPage = { '@type': 'WebPage', '@id': schema.url };
    const figures = article.sections.flatMap(section => section.figures ?? []);
    if (figures.length) schema.image = figures.map(figure => absoluteUrl(figure.src, siteUrl));
  }
  const breadcrumbs = siteUrl ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [ { '@type': 'ListItem', position: 1, name: language === 'en' ? 'Home' : '首页', item: absoluteUrl(language === 'en' ? 'en/' : '', siteUrl) }, { '@type': 'ListItem', position: 2, name: language === 'en' ? 'Blog' : '博客', item: absoluteUrl(language === 'en' ? 'en/blog/' : 'blog/', siteUrl) }, { '@type': 'ListItem', position: 3, name: localized(article.title, language), item: schema.url } ] } : null;
  return `<meta property="og:type" content="article"><meta property="og:title" content="${escapeHtml(schema.headline)}"><meta property="og:description" content="${escapeHtml(schema.description)}"><meta name="twitter:card" content="summary">${schema.url ? `<meta property="og:url" content="${escapeHtml(schema.url)}">` : ''}<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>${breadcrumbs ? `<script type="application/ld+json">${JSON.stringify(breadcrumbs).replaceAll('<', '\\u003c')}</script>` : ''}`;
}

function writeSectionPages(source, outputRoot, siteUrl) {
  const pages = [
    { section: 'providers', directory: 'providers', title: ['CDN 厂商目录 · CDN Bench', 'CDN provider directory · CDN Bench'], description: ['CDN 厂商产品定位与选型档案目录。', 'A directory of CDN provider positioning and selection profiles.'] },
    { section: 'blog', directory: 'blog', title: ['CDN 博客 · CDN Bench', 'The Edge Journal · CDN Bench'], description: ['CDN 选型、配置方法与测量边界的原创文章。', 'Original notes on CDN selection, configuration, and measurement boundaries.'] },
    { section: 'lab', directory: 'lab', title: ['CDN 实测工具 · CDN Bench', 'Browser CDN benchmark lab · CDN Bench'], description: ['从浏览器直接测试 CDN 公共文件的本地工具。', 'A browser-local tool for testing public CDN files from your network.'] },
    { section: 'methodology', directory: 'methodology', title: ['CDN 测量说明 · CDN Bench', 'CDN measurement notes · CDN Bench'], description: ['浏览器 CDN 测量的指标定义与边界说明。', 'Definitions and boundaries for browser-based CDN measurements.'] },
  ];
  return Promise.all(pages.flatMap(page => ['zh', 'en'].map(async language => {
    const english = language === 'en';
    const directory = resolve(outputRoot, english ? 'en' : '', page.directory);
    const rootPrefix = english ? '../../' : '../';
    const route = `${english ? 'en/' : ''}${page.directory}/`;
    const alternateRoute = `${english ? '' : 'en/'}${page.directory}/`;
    const content = pageContent(source, page.section, language, rootPrefix);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), pageSource(source, language, { rootPrefix, route, alternateRoute, title: page.title[english ? 1 : 0], description: page.description[english ? 1 : 0], content }, siteUrl), 'utf8');
  })));
}

function writeArticlePages(source, outputRoot, siteUrl) {
  return Promise.all(ARTICLES.flatMap(article => ['zh', 'en'].map(async language => {
    const english = language === 'en';
    const directory = resolve(outputRoot, english ? 'en' : '', 'article', article.id);
    const rootPrefix = english ? '../../../' : '../../';
    const route = articlePath(article.id, language);
    const alternateRoute = articlePath(article.id, english ? 'zh' : 'en');
    const title = `${localized(article.title, language)} · CDN Bench`;
    const description = localized(article.excerpt, language);
    await mkdir(directory, { recursive: true });
    const page = pageSource(source, language, { rootPrefix, route, alternateRoute, title, description, content: articleBody(article, language, rootPrefix), includeScript: false }, siteUrl);
    await writeFile(resolve(directory, 'index.html'), page.replace('</head>', `${articleMetadata(article, language, route, siteUrl)}\n</head>`), 'utf8');
  })));
}

async function writeProviderPages(outputRoot, siteUrl) {
  await Promise.all(PROVIDERS.flatMap(provider => ['zh', 'en'].map(async language => {
    const directory = resolve(outputRoot, language === 'en' ? 'en' : '', 'providers', provider.id);
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), providerPage(provider, language, siteUrl), 'utf8');
  })));
}

async function writeHomepages(outputRoot, siteUrl) {
  const source = await readSiteSource();
  await mkdir(resolve(outputRoot, 'en'), { recursive: true });
  await writeFile(resolve(outputRoot, 'index.html'), homepage(source, 'zh', siteUrl).replace('</head>', '<link rel="stylesheet" href="./rankings.css">' + '</head>'), 'utf8');
  await writeFile(resolve(outputRoot, 'en/index.html'), homepage(source, 'en', siteUrl).replace('</head>', '<link rel="stylesheet" href="../rankings.css">' + '</head>'), 'utf8');
}

async function writeDiscoveryFiles(outputRoot, siteUrl) {
  if (!siteUrl) {
    await rm(resolve(outputRoot, 'sitemap.xml'), { force: true });
    await writeFile(resolve(outputRoot, 'robots.txt'), 'User-agent: *\nAllow: /\nDisallow: /admin/\n', 'utf8');
    return;
  }
  const routes = ['', 'en/', 'providers/', 'en/providers/', 'blog/', 'en/blog/', 'lab/', 'en/lab/', 'methodology/', 'en/methodology/', ...ARTICLES.flatMap(article => [`article/${article.id}/`, `en/article/${article.id}/`]), ...PROVIDERS.flatMap(provider => [`providers/${provider.id}/`, `en/providers/${provider.id}/`])];
  const entries = routes.map(route => `  <url><loc>${escapeHtml(absoluteUrl(route, siteUrl))}</loc></url>`).join('\n');
  await writeFile(resolve(outputRoot, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`, 'utf8');
  await writeFile(resolve(outputRoot, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: ${absoluteUrl('sitemap.xml', siteUrl)}\n`, 'utf8');
}

export async function buildPages({ outputRoot = root, siteUrl = process.env.SITE_URL ?? '' } = {}) {
  const normalizedUrl = normalizeSiteUrl(siteUrl);
  await mkdir(outputRoot, { recursive: true });
  const source = await readSiteSource();
  await writeProviderPages(outputRoot, normalizedUrl);
  await writeSectionPages(source, outputRoot, normalizedUrl);
  await writeArticlePages(source, outputRoot, normalizedUrl);
  await writeHomepages(outputRoot, normalizedUrl);
  for (const path of ['contact/index.html', 'en/contact/index.html']) await rm(resolve(outputRoot, path), { force: true });
  await writeDiscoveryFiles(outputRoot, normalizedUrl);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await buildPages();
  console.log(`Generated ${PROVIDERS.length * 2} provider pages and bilingual homepages.`);
}
