const preferredOrder = ['cloudflare', 'yewsafe', 'akamai', 'fastly', 'cdn5'];
const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

// UI preview fixtures only. Keep these separate from provider facts and lab results.
export function demoResponse(id) {
  const featured = { cloudflare: 18.6, yewsafe: 22.4, akamai: 28.1, fastly: 33.7, cdn5: 39.2 };
  const hash = [...String(id)].reduce((value, character) => (value * 31 + character.charCodeAt(0)) >>> 0, 7);
  const milliseconds = Object.hasOwn(featured, id) ? featured[id] : (420 + hash % 1320) / 10;
  return { milliseconds, tone: milliseconds < 60 ? 'fast' : milliseconds < 110 ? 'balanced' : 'standard', width: Math.max(12, Math.round((1 - milliseconds / 220) * 100)) };
}

function renderDemoResponse(provider) {
  const sample = demoResponse(provider.id);
  return '<td class="ranking-response" data-response-ms="' + sample.milliseconds.toFixed(1) + '"><span class="ranking-metric is-' + sample.tone + '"><span class="ranking-metric-value">' + sample.milliseconds.toFixed(1) + '<span class="ranking-metric-unit">ms</span></span><span class="ranking-meter" aria-hidden="true"><span style="width:' + sample.width + '%"></span></span></span></td>';
}

export function orderedProviders(providers) {
  const selected = preferredOrder.map(id => providers.find(provider => provider.id === id)).filter(Boolean);
  return [...selected, ...providers.filter(provider => !preferredOrder.includes(provider.id))];
}

export function renderRankings(providers, language) {
  const english = language === 'en';
  const pick = (zh, en) => english ? en : zh;
  const items = orderedProviders(providers);
  const capabilities = [['delivery', '内容分发', 'Delivery'], ['security', '安全防护', 'Security'], ['programmable', '边缘开发', 'Edge development'], ['cloud', '云生态', 'Cloud ecosystem']];
  const rows = items.map((provider, index) => {
    const publicUrl = provider.sourceUrl ?? provider.officialUrl;
    const search = escape([provider.name, provider.id, provider.officialUrl, provider.tagline.zh, provider.tagline.en, provider.bestFor.zh, provider.bestFor.en].join(' ').toLocaleLowerCase());
    const logo = /^https:/.test(provider.logo) ? provider.logo : (english ? '../' : './') + provider.logo;
    return '<tr class="ranking-row' + (index < 3 ? ' ranking-featured' : '') + '" data-ranking-id="' + escape(provider.id) + '" data-search="' + search + '" data-categories="' + escape(provider.categories.join(' ')) + '"><td class="ranking-position"><span>' + String(index + 1).padStart(2, '0') + '</span></td><th scope="row"><a class="ranking-provider" href="./providers/' + escape(provider.id) + '/"><span class="ranking-logo' + (provider.logoDark ? ' is-dark' : '') + '"><img src="' + escape(logo) + '" alt="" width="36" height="28" loading="lazy"></span><span><strong>' + escape(provider.name) + '</strong><small>' + escape(provider.tagline[language]) + '</small></span></a></th>' + renderDemoResponse(provider) + capabilities.map(([key, zh, en]) => '<td class="ranking-capability' + (provider.categories.includes(key) ? ' is-listed' : '') + '"><span aria-label="' + escape(pick(zh, en) + '：' + (provider.categories.includes(key) ? pick('官网列示', 'Listed by provider') : pick('本目录未标注', 'Not classified here'))) + '">' + (provider.categories.includes(key) ? '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 10 3 3 7-7"/></svg>' : '—') + '</span></td>').join('') + '<td class="ranking-source"><a href="' + escape(publicUrl) + '" target="_blank" rel="noopener noreferrer" aria-label="' + escape(provider.name + pick(' 官方资料', ' official source')) + '">' + pick('官网', 'Source') + ' <span aria-hidden="true">↗</span></a></td></tr>';
  }).join('');
  return '<section id="cdn-rankings" class="home-rankings" aria-labelledby="rankings-title"><div class="ranking-heading"><div><span class="home-eyebrow">THE CDN INDEX / ' + String(items.length).padStart(2, '0') + ' PROVIDERS</span><h2 id="rankings-title">' + pick('全球 CDN 选型榜单', 'The global CDN shortlist') + '<span class="ranking-editorial">' + pick('编辑排序', 'Editorial order') + '</span></h2><p>' + pick('从交付到防护，把值得了解的服务商放在同一张表里。', 'Delivery, protection, and the edge. Explore providers side by side.') + '</p></div><a class="home-text-link" href="./lab/">' + pick('测测你的真实访问速度', 'Test from your network') + '<span aria-hidden="true">↗</span></a></div><div class="ranking-toolbar"><label class="ranking-search"><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><span class="sr-only">' + pick('搜索 CDN 服务商', 'Search CDN providers') + '</span><input id="ranking-search" type="search" placeholder="' + pick('搜索服务商、产品或场景…', 'Search providers, products, or workloads…') + '" autocomplete="off"></label><div class="ranking-filters" aria-label="' + pick('产品方向筛选', 'Filter by product direction') + '">' + [['all','全部','All'],...capabilities].map(([key,zh,en],i) => '<button type="button" data-ranking-filter="' + key + '" aria-pressed="' + (i===0) + '">' + pick(zh,en) + '</button>').join('') + '</div></div><p class="ranking-note" id="ranking-note">' + pick('排序由站点编辑设定，不代表速度排名。勾选表示官方资料列示的产品方向；未标注不等于不支持。', 'Order is curated by this site, not a speed ranking. Checks indicate documented product directions; unmarked does not mean unsupported.') + '</p><div class="ranking-scroll" role="region" aria-labelledby="rankings-title" tabindex="0"><table class="ranking-table" aria-describedby="ranking-note"><colgroup><col class="rank-col"><col class="provider-col"><col class="response-col"><col span="4" class="capability-col"><col class="source-col"></colgroup><thead><tr><th scope="col">#</th><th scope="col">' + pick('CDN 服务商', 'CDN PROVIDER') + '</th><th scope="col">' + pick('响应耗时', 'RESPONSE TIME') + '</th>' + capabilities.map(([,zh,en])=>'<th scope="col" class="capability-heading">'+pick(zh,en)+'</th>').join('') + '<th scope="col">' + pick('资料', 'SOURCE') + '</th></tr></thead><tbody>' + rows + '</tbody></table><p class="ranking-empty" hidden>' + pick('没有匹配的服务商，试试其他关键词。', 'No providers match. Try another keyword.') + '</p></div><div class="ranking-footer"><p id="ranking-count" aria-live="polite">' + pick('共收录 ', 'Directory: ') + items.length + pick(' 家服务商', ' providers') + '</p><button id="ranking-more" type="button" hidden>' + pick('展开更多服务商', 'Show more providers') + ' <span aria-hidden="true">↓</span></button><span class="ranking-legend"><i></i>' + pick('官方产品方向 · 非性能评分', 'Documented direction · Not a performance score') + '</span></div></section>';
}
