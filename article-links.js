// Deliberately small inline-link syntax: HTML is always escaped.
export function articleLinkParts(value) {
  const text = String(value ?? '');
  const parts = [];
  let cursor = 0;
  for (const match of text.matchAll(/\[([^\]\n]+)\]\(([^\s)]+)\)/g)) {
    if (match.index > cursor) parts.push({ text: text.slice(cursor, match.index) });
    const href = match[2];
    let valid = false;
    let external = false;
    if (href.startsWith('https://')) {
      try { const url = new URL(href); valid = !url.username && !url.password; external = true; } catch {}
    } else {
      valid = /^(?:(?:article|providers)\/[a-z0-9-]+\/|(?:providers|blog|lab|methodology|contact)\/)$/.test(href);
    }
    parts.push(valid ? { text: match[1], href, external } : { text: match[0] });
    cursor = match.index + match[0].length;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor) });
  return parts;
}

export const plainArticleText = value => articleLinkParts(value).map(part => part.text).join('');

export function articleLinkHref(part, language, rootPrefix) {
  return part.external ? part.href : `${rootPrefix}${language === 'en' ? 'en/' : ''}${part.href}`;
}

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('\"', '&quot;').replaceAll("'", '&#39;');

export function renderArticleText(value, language = 'zh', rootPrefix = '../../') {
  return articleLinkParts(value).map(part => part.href
    ? `<a href="${escape(articleLinkHref(part, language, rootPrefix))}"${part.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escape(part.text)}</a>`
    : escape(part.text)).join('');
}

export const validArticleImage = value => typeof value === 'string' && /^assets\/editorial\/[a-z0-9-]+\.svg$/.test(value);
export function articleBodyText(article, language = 'zh') {
  return article.sections.flatMap(section => [
    section.heading, ...(section.paragraphs ?? []), ...(section.bullets ?? []),
    ...(section.table ? [section.table.caption, ...section.table.columns, ...section.table.rows.flat()] : [])
  ]).filter(Boolean).map(value => plainArticleText(value[language] ?? '')).join('\n\n');
}
export function renderArticleExtras(section, language = 'zh', rootPrefix = '../../') {
  const inline = value => renderArticleText(value?.[language] ?? '', language, rootPrefix);
  const table = section.table ? '<div class="article-table-scroll" tabindex="0" role="region" aria-label="' + escape(section.table.caption?.[language] ?? '') + '"><table class="article-comparison"><caption>' + inline(section.table.caption) + '</caption><thead><tr>' + section.table.columns.map(column => '<th scope="col">' + inline(column) + '</th>').join('') + '</tr></thead><tbody>' + section.table.rows.map(row => '<tr>' + row.map((cell,index) => (index === 0 ? '<th scope="row">' : '<td>') + inline(cell) + (index === 0 ? '</th>' : '</td>')).join('') + '</tr>').join('') + '</tbody></table></div>' : '';
  const figures = (section.figures ?? []).filter(figure => validArticleImage(figure.src)).map(figure => '<figure class="article-figure"><div class="article-figure-visual" tabindex="0" role="region" aria-label="' + escape(figure.alt?.[language] ?? '') + '"><img src="' + escape(rootPrefix + figure.src) + '" alt="' + escape(figure.alt?.[language] ?? '') + '" width="1000" height="420" loading="lazy" decoding="async"></div><figcaption><span>' + inline(figure.caption) + '</span><small><a href="' + escape(rootPrefix + figure.src) + '">' + escape(figure.credit?.[language] ?? '') + '</a></small></figcaption></figure>').join('');
  return table + figures;
}
