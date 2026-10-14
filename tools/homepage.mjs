import { renderRankings } from './rankings.mjs';
function escapeHtml(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}

function globeArtwork() {
  const continentShapes = [
    [[-168,65],[-145,71],[-126,69],[-111,58],[-85,63],[-61,52],[-65,44],[-80,26],[-89,17],[-102,22],[-118,33],[-126,49],[-154,57]],
    [[-74,12],[-61,10],[-46,-1],[-34,-8],[-41,-24],[-54,-36],[-69,-55],[-74,-41],[-81,-11]],
    [[-53,83],[-24,76],[-42,59],[-60,64]],
    [[-11,36],[-6,56],[15,71],[40,68],[60,74],[110,73],[166,60],[144,45],[124,35],[110,18],[101,5],[80,9],[70,24],[52,29],[43,41],[31,42],[28,36]],
    [[-17,32],[4,37],[30,31],[43,12],[51,10],[43,-13],[31,-33],[18,-35],[8,-17],[-9,4]],
    [[113,-22],[129,-12],[143,-15],[154,-27],[143,-39],[119,-34]],
    [[47,-12],[50,-17],[46,-26],[43,-20]],
    [[129,34],[142,45],[145,40],[137,32]],
    [[95,5],[106,-7],[120,-9],[127,-4],[117,1]],
  ];
  const inside = (longitude, latitude, polygon) => {
    let contained = false;
    for (let current = 0, previous = polygon.length - 1; current < polygon.length; previous = current++) {
      const [currentX, currentY] = polygon[current];
      const [previousX, previousY] = polygon[previous];
      if ((currentY > latitude) !== (previousY > latitude) && longitude < (previousX - currentX) * (latitude - currentY) / (previousY - currentY) + currentX) contained = !contained;
    }
    return contained;
  };
  const dots = [];
  const centerLongitude = 12 * Math.PI / 180;
  const tilt = 14 * Math.PI / 180;
  for (let latitude = -78; latitude <= 82; latitude += 3) {
    const latitudeRadians = latitude * Math.PI / 180;
    const longitudeStep = 3 / Math.max(.22, Math.cos(latitudeRadians));
    for (let longitude = -180; longitude < 180; longitude += longitudeStep) {
      const angle = longitude * Math.PI / 180 - centerLongitude;
      const depth = Math.cos(latitudeRadians) * Math.cos(angle);
      const vertical = Math.sin(latitudeRadians) * Math.cos(tilt) - depth * Math.sin(tilt);
      const facing = depth * Math.cos(tilt) + Math.sin(latitudeRadians) * Math.sin(tilt);
      if (facing < .02) continue;
      const horizontal = Math.cos(latitudeRadians) * Math.sin(angle);
      const land = continentShapes.some(polygon => inside(longitude, latitude, polygon));
      dots.push('<circle cx="' + (280 + horizontal * 207).toFixed(2) + '" cy="' + (280 - vertical * 207).toFixed(2) + '" r="' + (land ? 1.65 : .82) + '" fill="' + (land ? '#45745e' : '#b8cbbb') + '" opacity="' + (land ? .42 + facing * .55 : .18 + facing * .19).toFixed(2) + '"/>');
    }
  }
  return '<svg class="edge-globe" viewBox="0 0 560 560" fill="none" aria-hidden="true"><defs><radialGradient id="globe-surface" cx="35%" cy="28%" r="78%"><stop offset="0" stop-color="#f5f8ef"/><stop offset=".7" stop-color="#e7efdf"/><stop offset="1" stop-color="#d9e5d0"/></radialGradient><radialGradient id="globe-halo"><stop offset=".55" stop-color="#dae9cb" stop-opacity=".5"/><stop offset="1" stop-color="#dae9cb" stop-opacity="0"/></radialGradient><clipPath id="globe-clip"><circle cx="280" cy="280" r="207"/></clipPath></defs><circle cx="280" cy="280" r="277" fill="url(#globe-halo)"/><circle cx="280" cy="280" r="253" stroke="#d9e3d1" stroke-dasharray="2 7"/><circle cx="280" cy="280" r="230" stroke="#d7e2d0"/><circle cx="280" cy="280" r="207" fill="url(#globe-surface)" stroke="#d0dec7"/><g clip-path="url(#globe-clip)">' + dots.join('') + '</g><g stroke="#51725d" stroke-width="1" opacity=".27"><ellipse cx="280" cy="280" rx="270" ry="78" transform="rotate(-29 280 280)"/><path d="M149 118C304 54 456 141 437 284"/><path d="M124 383C236 486 394 471 471 353"/></g><path class="globe-route" d="M157 213Q330 52 427 280" stroke="#476e46" stroke-width="1.5" stroke-dasharray="4 6"/><path d="M157 213Q198 397 336 404" stroke="#648658" stroke-width="1" opacity=".45"/><g fill="#284b38"><circle cx="157" cy="213" r="4"/><circle cx="427" cy="280" r="4"/><circle cx="336" cy="404" r="4"/></g><g stroke="#759458" opacity=".55"><circle cx="157" cy="213" r="12"/><circle cx="427" cy="280" r="12"/><circle cx="336" cy="404" r="12"/></g><g class="globe-satellite"><circle cx="280" cy="27" r="4" fill="#456b36"/><circle cx="280" cy="27" r="9" stroke="#759458" opacity=".3"/></g></svg>';
}

function articleArtwork(index) {
  const patterns = [
    '<g stroke="currentColor" stroke-width="1"><circle cx="180" cy="110" r="65"/><circle cx="180" cy="110" r="46"/><circle cx="180" cy="110" r="26"/><path d="M65 110H295M180 20V200" opacity=".35"/><path d="M65 42L295 178M65 178L295 42" opacity=".25"/></g><circle cx="180" cy="110" r="4" fill="currentColor"/><circle cx="225" cy="64" r="4" fill="currentColor"/>',
    '<g stroke="currentColor" stroke-width="1"><rect x="90" y="53" width="118" height="118" rx="59"/><rect x="154" y="53" width="118" height="118" rx="59"/><path d="M181 30V192M62 112H299" stroke-dasharray="3 5" opacity=".4"/></g><circle cx="122" cy="112" r="4" fill="currentColor"/><circle cx="240" cy="112" r="4" fill="currentColor"/>',
    '<g stroke="currentColor" stroke-width="1" fill="none"><path d="M54 160H306M54 112H306M54 64H306" opacity=".2"/><path d="M61 164L110 123L154 141L204 72L246 97L300 49"/><path d="M61 164L110 123L154 141L204 72L246 97L300 49" stroke-width="12" opacity=".05"/></g><g fill="currentColor"><circle cx="110" cy="123" r="3"/><circle cx="204" cy="72" r="3"/><circle cx="300" cy="49" r="3"/></g>',
  ];
  return '<svg viewBox="0 0 360 220" fill="none" aria-hidden="true">' + patterns[index % patterns.length] + '</svg>';
}

export function renderHomepage(providers, articles, language) {
  const english = language === 'en';
  const pick = (zh, en) => english ? en : zh;
  const copy = value => escapeHtml(value?.[language] ?? value?.zh ?? '');
  const selected = ['cloudflare', 'yewsafe', 'akamai', 'fastly', 'cdn5', 'cloudfront'].map(id => providers.find(provider => provider.id === id)).filter(Boolean);
  if (!selected.length) selected.push(...providers.slice(0, 6));
  const logos = selected.map(provider => '<div class="home-provider-name"><img src="' + escapeHtml(/^https:/.test(provider.logo) ? provider.logo : (english ? '../' : './') + provider.logo) + '" alt="" width="36" height="32" loading="lazy"><span>' + escapeHtml(provider.name.replace('Amazon CloudFront', 'CloudFront')) + '</span></div>').join('');
  const featured = articles.slice(0, 3).map((article, index) => '<article class="home-story"><a class="home-story-link" href="./article/' + escapeHtml(article.id) + '/"><div class="home-story-art home-story-art-' + index + '"><span class="story-art-label">FIELD NOTES / 0' + (index + 1) + '</span>' + articleArtwork(index) + '<span class="story-art-arrow" aria-hidden="true">↗</span></div><div class="home-story-meta"><span>' + copy(article.category) + '</span><span>' + article.readTime + pick(' 分钟阅读', ' min read') + '</span></div><h3>' + copy(article.title) + '</h3><p>' + copy(article.excerpt) + '</p><span class="home-text-link">' + pick('阅读全文', 'Read the story') + ' <span aria-hidden="true">↗</span></span></a></article>').join('');
  return '<section class="home-hero" aria-labelledby="home-title"><div class="home-hero-copy"><p class="home-eyebrow"><span class="home-live-dot"></span>' + pick('独立视角，理解全球边缘网络', 'AN INDEPENDENT PERSPECTIVE ON THE EDGE') + '</p><h1 id="home-title"><span>' + pick('让世界更近。', 'A closer world.') + '</span><span class="home-title-muted">' + pick('让选择更清晰。', 'A clearer choice.') + '</span></h1><p class="home-hero-description">' + pick('看懂每一家 CDN 的不同，再用真实请求验证。<br>从全球交付到业务防护，为下一次选择找到依据。', 'Understand what sets each CDN apart. Then put it to the test.<br>Clarity for your next decision, from delivery to security.') + '</p><div class="home-hero-actions"><a class="home-button" href="./providers/">' + pick('探索 CDN 厂商', 'Explore providers') + '<span aria-hidden="true">↗</span></a><a class="home-text-link" href="./lab/">' + pick('从你的网络开始实测', 'Test from your network') + '<span aria-hidden="true">→</span></a></div><div class="home-hero-footnote"><span class="home-small-icon" aria-hidden="true">◎</span>' + pick('公开资料 · 透明方法 · 不做虚构排名', 'Public sources. Transparent methods. No invented rankings.') + '</div></div><figure class="home-network"><div class="network-caption"><span>THE CONNECTED WORLD</span><span>01 /</span></div>' + globeArtwork() + '<span class="network-label network-label-one"><span></span>AMERICAS</span><span class="network-label network-label-two"><span></span>EUROPE</span><span class="network-label network-label-three"><span></span>ASIA PACIFIC</span><figcaption><span>' + pick('每一次连接，都值得更好的选择。', 'Every connection deserves a better choice.') + '</span><small>' + pick('网络概念示意 · 非实时节点', 'Concept illustration · Not live network data') + '</small></figcaption></figure></section><section class="home-directory-band" aria-label="' + pick('目录收录', 'Inside the directory') + '"><div class="home-band-intro"><span class="home-eyebrow">INSIDE THE DIRECTORY</span><p><strong id="provider-total">' + providers.length + '</strong> ' + pick('家厂商，多种可能。', 'providers. Different possibilities.') + '</p></div><div class="home-logo-strip">' + logos + '</div><p class="home-band-note">' + pick('目录收录展示，不代表合作或推荐。', 'Directory coverage, not a partnership or endorsement.') + '</p></section>' + renderRankings(providers, language) + '<section class="home-perspective" aria-labelledby="perspective-title"><div class="home-perspective-heading"><span class="home-eyebrow">LESS NOISE. MORE CLARITY.</span><h2 id="perspective-title">' + pick('少一点噪音。<br><span>多一点判断。</span>', 'Less noise.<br><span>More perspective.</span>') + '</h2><p>' + pick('没有适合所有业务的 CDN。<br>只有更适合你的那一个。', 'There is no single CDN for every workload.<br>There is a better fit for yours.') + '</p><a class="home-text-link" href="./methodology/">' + pick('了解我们的测量方法', 'Understand our methodology') + '<span aria-hidden="true">↗</span></a></div><div class="home-principles"><div class="home-principle"><span class="principle-index">01 /</span><div><h3>' + pick('先看能力，不只看名字。', 'Capabilities, not just a name.') + '</h3><p>' + pick('全球分发、边缘计算、安全防护。把公开产品资料放在一起，理解差异，而不是照着品牌做决定。', 'Delivery, edge compute, security. Compare public product information to understand the differences, beyond the brand.') + '</p></div></div><div class="home-principle"><span class="principle-index">02 /</span><div><h3>' + pick('用真实请求，代替想象。', 'Real requests, not assumptions.') + '</h3><p>' + pick('从你当前的网络发出请求，记录响应和下载体验。结果属于此刻的你，不被包装成全球排行榜。', 'Measure response and download experience from your own network. Your results reflect your context, not a global leaderboard.') + '</p></div></div><div class="home-principle"><span class="principle-index">03 /</span><div><h3>' + pick('说清依据，也说清边界。', 'Clear sources. Honest boundaries.') + '</h3><p>' + pick('把官方资料、编辑解读和实测结果分开呈现。可以验证的才是依据，尚未验证的如实说明。', 'Keep official information, editorial guidance, and measurements distinct. Evidence should be verifiable; uncertainty should be visible.') + '</p></div></div></div></section>' + (featured ? '<section class="home-journal" aria-labelledby="journal-title"><div class="home-section-heading"><div><span class="home-eyebrow">THE EDGE JOURNAL</span><h2 id="journal-title">' + pick('好决策，从读懂开始。', 'Good decisions begin with understanding.') + '</h2></div><a class="home-text-link" href="./blog/">' + pick('全部文章', 'All stories') + ' <span aria-hidden="true">↗</span></a></div><div class="home-story-grid">' + featured + '</div><p class="home-journal-note"><strong id="article-total">' + articles.length + '</strong> ' + pick('篇技术指南，中英双语。精选文章在独立页面阅读全文。', 'guides, in Chinese and English. Read each story on its own page.') + '</p></section>' : '') + '<section class="home-lab-invite" aria-labelledby="home-lab-title"><div class="home-lab-copy"><span class="home-eyebrow">YOUR NETWORK. YOUR PERSPECTIVE.</span><h2 id="home-lab-title">' + pick('下一步，让真实体验说话。', 'Next, let your experience speak.') + '</h2><p>' + pick('打开实测工具，从你所在的网络开始。<br>无需注册，测量结果留在你的浏览器。', 'Open the lab and start from where you are.<br>No account needed. Results stay in your browser.') + '</p></div><a class="home-button home-button-light" href="./lab/">' + pick('进入实测工具', 'Open the benchmark lab') + '<span aria-hidden="true">↗</span></a><div class="lab-invite-orbit" aria-hidden="true"></div></section>';
}
