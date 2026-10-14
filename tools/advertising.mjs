export const AD_POSITIONS = ['top', 'left', 'right'];
export const AD_LANGUAGES = ['zh', 'en'];
export const DEFAULT_ADVERTISING = Object.fromEntries(AD_LANGUAGES.map(language => [language, Object.fromEntries(AD_POSITIONS.map(position => [position, {
  enabled: true, type: 'placeholder', expiresOn: '', image: '', mobileImage: '', link: '',
  alt: '', code: '', height: position === 'top' ? 110 : 600,
}]))]));

// Previously shared advertisements belong to the Chinese site on migration.
// English slots start independently; never copy Chinese creatives into them.
export function advertisingLanguages(settings = DEFAULT_ADVERTISING) {
  return Object.hasOwn(settings, 'zh') || Object.hasOwn(settings, 'en')
    ? settings : { zh: settings, en: DEFAULT_ADVERTISING.en };
}

const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
export const isAdImagePath = value => typeof value === 'string' && /^assets\/ads\/[a-f0-9]{64}\.(png|jpg|gif|webp)$/.test(value);
export const adExpiresAt = ad => ad.expiresOn ? Date.parse(`${ad.expiresOn}T16:00:00.000Z`) : 0;
export const adIsActive = (ad, now = Date.now()) => ad?.enabled === true && (!ad.expiresOn || now < adExpiresAt(ad));

export function publicAdvertising(settings = DEFAULT_ADVERTISING, now = Date.now()) {
  const localized = advertisingLanguages(settings);
  return Object.fromEntries(AD_LANGUAGES.map(language => [language, Object.fromEntries(AD_POSITIONS.map(position => {
    const ad = localized[language]?.[position] ?? DEFAULT_ADVERTISING[language][position];
    return [position, adIsActive(ad, now)
      ? { ...ad, image: ad.type === 'image' ? ad.image : '', mobileImage: ad.type === 'image' ? ad.mobileImage ?? '' : '', link: ad.type === 'image' ? ad.link : '', code: ad.type === 'code' ? ad.code : '' }
      : { ...DEFAULT_ADVERTISING[language][position], enabled: false }];
  }))]));
}

export function adCodeDocument(code) {
  return `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src https: data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src https:; form-action 'none'; base-uri 'none'"><style>html,body{margin:0;width:100%;height:100%;overflow:hidden}*{box-sizing:border-box}img,video{max-width:100%}</style></head><body>${code}</body></html>`;
}

export function renderAdvertising(settings = DEFAULT_ADVERTISING, language = 'zh', rootPrefix = './', now = Date.now()) {
  const english = language === 'en';
  language = english ? 'en' : 'zh';
  const localized = advertisingLanguages(settings)[language];
  const labels = english ? { top: 'Banner advertising', left: 'Left floating advertising', right: 'Right floating advertising' }
    : { top: '顶部横幅广告', left: '左侧悬浮广告', right: '右侧悬浮广告' };
  const slots = AD_POSITIONS.map(position => {
    const ad = localized?.[position] ?? DEFAULT_ADVERTISING[language][position];
    if (!adIsActive(ad, now)) return '';
    const rail = position !== 'top';
    let creative;
    if (ad.type === 'image') {
      let image = `<img class="site-ad-image" src="${escape(isAdImagePath(ad.image) ? rootPrefix + ad.image : ad.image)}" alt="${escape((typeof ad.alt === 'string' ? ad.alt : ad.alt?.[language]) || labels[position])}" decoding="async">`;
      if (!rail && ad.mobileImage) image = `<picture class="site-ad-picture"><source media="(max-width: 600px)" srcset="${escape((isAdImagePath(ad.mobileImage) ? rootPrefix + ad.mobileImage : ad.mobileImage).replaceAll(',', '%2C').replaceAll(' ', '%20'))}">${image}</picture>`;
      creative = ad.link ? `<a class="site-ad-link" href="${escape(ad.link)}" target="_blank" rel="sponsored noopener noreferrer">${image}</a>` : image;
    } else if (ad.type === 'code') {
      creative = `<iframe class="site-ad-frame" title="${escape(labels[position])}" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer" srcdoc="${escape(adCodeDocument(ad.code))}"></iframe>`;
    } else {
      creative = `<div class="site-ad-placeholder"><span class="site-ad-placeholder-mark" aria-hidden="true">${rail ? '↗' : '+'}</span><span>${english ? 'Advertising space' : '广告合作位'}</span><small>${rail ? '128 × ' + ad.height : 'BANNER'} · ADVERTISEMENT</small></div>`;
    }
    return `<aside class="${rail ? 'site-ad-rail site-ad-' + position : 'site-ad-slot'}" data-ad-slot="sitewide-${position}" data-ad-type="${ad.type}" data-ad-expires="${adExpiresAt(ad)}" style="--ad-height:${ad.height}px" role="complementary" aria-label="${escape(labels[position])}"><span class="site-ad-label">${english ? 'ADVERTISEMENT' : '广告位 / ADVERTISEMENT'}</span>${rail ? `<button class="site-ad-close" type="button" aria-label="${english ? 'Close advertisement' : '关闭广告'}">×</button>` : ''}<div class="site-ad-creative">${ad.type === 'placeholder' ? creative : `<template data-ad-creative>${creative}</template>`}</div></aside>`;
  }).join('\n');
  return `<!--SITE_ADS_START-->${slots}<!--SITE_ADS_END-->`;
}

export function replaceAdvertising(html, settings, language, rootPrefix, now = Date.now()) {
  return html.replace(/<!--SITE_ADS_START-->[\s\S]*?<!--SITE_ADS_END-->/, () => renderAdvertising(settings, language, rootPrefix, now));
}
