import { providerCategories } from '../content.js';
import { getProviderSeo } from '../seo-content.js';
import { CONTACT_TYPES, DEFAULT_CONTACT } from './contact.mjs';
import { validArticleImage } from '../article-links.js';
import { AD_POSITIONS, AD_LANGUAGES, DEFAULT_ADVERTISING, advertisingLanguages, isAdImagePath } from './advertising.mjs';

export class AdminError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function invalid(message) {
  throw new AdminError(400, message);
}

function object(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) invalid(`${label}格式无效。`);
  return value;
}

function text(value, label, limit = 12000, required = true) {
  if (typeof value !== 'string' || value.length > limit || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) invalid(`${label}格式无效或过长。`);
  const result = value.trim();
  if (required && !result) invalid(`请填写${label}。`);
  return result;
}

function copy(value, label, limit) {
  object(value, label);
  const zh = text(value.zh, `${label}（中文）`, limit);
  const en = text(value.en ?? '', `${label}（英文）`, limit, false) || zh;
  return { zh, en };
}

function list(value, label, limit, minimum = 0) {
  if (!Array.isArray(value) || value.length > limit || value.length < minimum) invalid(`${label}条数应为 ${minimum}–${limit}。`);
  return value;
}

export function validSlug(value) {
  return typeof value === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) && value.length <= 64 && !/^(index|con|prn|aux|nul|com[1-9]|lpt[1-9])$/.test(value);
}

function slug(value, label) {
  if (!validSlug(value)) invalid(`${label}只能使用小写字母、数字及连接符，最多 64 字符，且不能使用保留名称。`);
  return value;
}

function date(value, label) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0, 10) !== value) invalid(`${label}不是有效日期。`);
  return value;
}

function webUrl(value, label) {
  const result = text(value, label, 2048);
  let parsed;
  try { parsed = new URL(result); } catch { invalid(`${label}不是有效网址。`); }
  if (parsed.protocol !== 'https:' || parsed.username || parsed.password) invalid(`${label}必须是无账号密码的 HTTPS 网址。`);
  return parsed.href;
}

function logo(value) {
  if (!value) return 'favicon.svg';
  if (/^https:\/\//.test(value)) return webUrl(value, 'Logo 网址');
  if (value === 'favicon.svg' || /^assets\/logos\/[a-zA-Z0-9_-]+\.(svg|png|jpg|jpeg|webp)$/.test(value)) return value;
  invalid('Logo 应为 HTTPS 图片地址或 assets/logos/ 下的图片路径。');
}

function provider(value) {
  object(value, '商家');
  const categories = list(value.categories, '商家分类', 4, 1);
  if (categories.some(category => !providerCategories.includes(category)) || new Set(categories).size !== categories.length) invalid('商家分类无效或重复。');
  const result = {
    id: slug(value.id, '商家 URL 标识'), name: text(value.name, '商家名称', 100),
    mark: text(value.mark ?? value.name.slice(0, 4), '商家缩写', 12),
    tone: ['green', 'orange', 'blue', 'red', 'purple', 'cyan', 'yellow'].includes(value.tone) ? value.tone : 'green',
    categories, verified: date(value.verified, '资料日期'), officialUrl: webUrl(value.officialUrl, '官方网站'),
    logo: logo(value.logo), logoDark: Boolean(value.logoDark),
    sourceLabel: copy(value.sourceLabel, '资料来源名称', 200),
    tagline: copy(value.tagline, '商家定位', 500), intro: copy(value.intro, '商家介绍'), bestFor: copy(value.bestFor, '适用场景', 2000),
    highlights: list(value.highlights, '产品亮点', 20, 1).map(item => copy(item, '产品亮点', 2000)),
    watchouts: copy(value.watchouts, '注意事项', 6000), compare: {},
  };
  object(value.compare, '对比信息');
  for (const field of ['delivery', 'security', 'edge', 'origin', 'fit']) result.compare[field] = copy(value.compare[field], '对比信息', 2000);
  if (value.sourceUrl) result.sourceUrl = webUrl(value.sourceUrl, '资料来源网址');
  const seo = value.seo ?? getProviderSeo(result);
  result.seo = {
    title: copy(seo.title, '详情页标题', 300), description: copy(seo.description, '详情页描述', 2000),
    analysis: copy(seo.analysis, '编辑解读', 12000), questions: list(seo.questions, '选型问题', 20, 1).map(item => copy(item, '选型问题', 2000)),
  };
  return result;
}

function article(value) {
  object(value, '博客文章');
  if (!['draft', 'published'].includes(value.status ?? 'published')) invalid('文章状态无效。');
  if (!Number.isInteger(value.readTime) || value.readTime < 1 || value.readTime > 180) invalid('阅读时间应为 1–180 分钟。');
  return {
    id: slug(value.id, '文章 URL 标识'), status: value.status ?? 'published', date: date(value.date, '文章日期'), readTime: value.readTime,
    ...(Number.isInteger(value.seriesOrder) && value.seriesOrder >= 1 && value.seriesOrder <= 50 ? {seriesOrder:value.seriesOrder} : {}),
    ...(value.modified ? { modified: date(value.modified, '更新日期') } : {}),
    title: copy(value.title, '文章标题', 500), excerpt: copy(value.excerpt, '文章摘要', 4000), category: copy(value.category, '文章分类', 100),
    sections: list(value.sections, '正文章节', 100, 1).map(section => {
      object(section, '文章章节');
      const paragraphs = list(section.paragraphs ?? [], '正文段落', 100).map(item => copy(item, '正文段落', 20000));
      const bullets = list(section.bullets ?? [], '正文列表', 100).map(item => copy(item, '正文列表', 6000));
      if (!paragraphs.length && !bullets.length) invalid('每个章节至少需要一段正文或一个列表项。');
      const result = { heading: copy(section.heading, '章节标题', 500), paragraphs, bullets };
      if (section.table) {
        object(section.table, '对照表');
        const columns = list(section.table.columns, '表格列', 6, 2).map(item => copy(item, '列标题', 300));
        const rows = list(section.table.rows, '表格行', 30, 1).map(row => {
          list(row, '表格单元格', columns.length, columns.length);
          return row.map(item => copy(item, '表格内容', 3000));
        });
        result.table = {caption:copy(section.table.caption, '表格说明', 1000),columns,rows};
      }
      if (section.figures?.length) {
        result.figures = list(section.figures, '章节图片', 4).map(figure => {
          object(figure, '正文图片');
          if (!validArticleImage(figure.src)) invalid('图片必须使用 assets/editorial/ 下的本地 SVG 文件。');
          return {src:figure.src,alt:copy(figure.alt,'图片替代文本',500),caption:copy(figure.caption,'图片说明',2000),credit:copy(figure.credit,'图片来源',500)};
        });
      }
      return result;
    }),
    sources: list(value.sources ?? [], '参考资料', 50).map(source => ({ url: webUrl(source.url, '参考资料网址'), label: copy(source.label, '参考资料名称', 300) })),
  };
}

export function validateContent(value) {
  object(value, '内容数据');
  const providers = list(value.providers, '商家', 200).map(provider);
  const articles = list(value.articles, '博客', 1000).map(article);
  for (const [label, items] of [['商家', providers], ['文章', articles]]) {
    if (new Set(items.map(item => item.id)).size !== items.length) invalid(`${label} URL 标识不能重复。`);
  }
  return { providers, articles, contact: validateContact(value.contact), advertising: validateAdvertising(value.advertising) };
}

export function validateAdvertising(value = DEFAULT_ADVERTISING) {
  object(value, '广告设置');
  const localized = Object.hasOwn(value, 'zh') || Object.hasOwn(value, 'en');
  if (Object.keys(value).some(key => !(localized ? AD_LANGUAGES : AD_POSITIONS).includes(key))) invalid('广告语言或广告位无效。');
  const variants = advertisingLanguages(value);
  return Object.fromEntries(AD_LANGUAGES.map(language => {
    const slots = object(variants[language] === undefined ? DEFAULT_ADVERTISING[language] : variants[language], '广告语言配置');
    if (Object.keys(slots).some(position => !AD_POSITIONS.includes(position))) invalid('广告位无效。');
    return [language, Object.fromEntries(AD_POSITIONS.map(position => {
      const ad = object(slots[position] === undefined ? DEFAULT_ADVERTISING[language][position] : slots[position], '广告位');
      if (typeof ad.enabled !== 'boolean') invalid('广告启用状态无效。');
      if (!['placeholder', 'image', 'code'].includes(ad.type)) invalid('广告类型无效。');
      const height = ad.height ?? DEFAULT_ADVERTISING[language][position].height;
      if (!Number.isInteger(height) || height < 88 || height > (position === 'top' ? 600 : 1200)) invalid('广告高度超出允许范围。');
      const expiresOn = ad.expiresOn ? date(ad.expiresOn, '广告到期日期') : '';
      if (expiresOn && (expiresOn < '2000-01-01' || expiresOn > '9999-12-30')) invalid('广告到期日期超出允许范围。');
      const image = ad.image ? (isAdImagePath(ad.image) ? ad.image : webUrl(ad.image, '广告图片')) : '';
      const mobileImage = ad.mobileImage ? (isAdImagePath(ad.mobileImage) ? ad.mobileImage : webUrl(ad.mobileImage, '手机广告图片')) : '';
      const link = ad.link ? webUrl(ad.link, '广告跳转地址') : '';
      const code = text(ad.code ?? '', '广告代码', 100000, ad.type === 'code');
      if (ad.type === 'image' && !image) invalid('请上传广告图片或填写图片地址。');
      return [position, { enabled: ad.enabled, type: ad.type, expiresOn, height, image, mobileImage, link, code,
        alt: text(typeof ad.alt === 'string' ? ad.alt : ad.alt?.[language] ?? '', '图片说明', 500, false) }];
    }))];
  }));
}

export function validateContact(value = DEFAULT_CONTACT) {
  object(value, '联系页面');
  const channels = list(value.channels ?? [], '联系方式', 12).map(channel => {
    object(channel, '联系方式');
    if (!Object.hasOwn(CONTACT_TYPES, channel.type)) invalid('联系方式类型无效。');
    const contactValue = text(channel.value, '联系方式', 2048);
    if (channel.type === 'email' && !/^[^\s@<>?,:;]+@[^\s@<>?,:;]+\.[^\s@<>?,:;]+$/.test(contactValue)) invalid('请输入有效的电子邮箱。');
    if (channel.type === 'phone' && (!/^\+?[\d\s()-]{5,32}$/.test(contactValue) || contactValue.replace(/\D/g, '').length < 5)) invalid('请输入有效的电话号码。');
    if (channel.type === 'qq' && !/^\d{5,20}$/.test(contactValue)) invalid('QQ 号码应为 5–20 位数字。');
    if (channel.type === 'telegram') {
      if (contactValue.startsWith('https://')) {
        const parsed = new URL(webUrl(contactValue, 'Telegram 链接'));
        if (parsed.hostname !== 't.me' || !parsed.pathname.slice(1)) invalid('Telegram 链接应使用 https://t.me/ 地址。');
      } else if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(contactValue)) invalid('请输入 Telegram 用户名或 https://t.me/ 链接。');
    }
    const normalized = channel.type === 'link' ? webUrl(contactValue, '联系链接') : contactValue;
    const optionalCopy = (content, label, limit) => ({ zh: text(content?.zh ?? '', label, limit, false), en: text(content?.en ?? '', label, limit, false) });
    return {
      type: channel.type, value: normalized, enabled: channel.enabled !== false,
      label: optionalCopy(channel.label, '渠道名称', 100), note: optionalCopy(channel.note, '联系说明', 1000),
      qrCode: channel.qrCode ? webUrl(channel.qrCode, '二维码图片') : '',
    };
  });
  return { title: copy(value.title ?? DEFAULT_CONTACT.title, '联系页面标题', 300), description: copy(value.description ?? DEFAULT_CONTACT.description, '联系页面简介', 2000), channels };
}

export function seedContent(providers, articles) {
  return validateContent({ providers: providers.map(item => ({ ...item, seo: getProviderSeo(item) })), articles: articles.map(item => ({ ...item, status: 'published' })) });
}

export function publicContent(value) {
  const contact = validateContact(value.contact);
  contact.channels = contact.channels.filter(channel => channel.enabled);
  return { providers: value.providers, articles: value.articles.filter(item => item.status === 'published'), contact, advertising: validateAdvertising(value.advertising) };
}
