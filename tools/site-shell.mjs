const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export function renderSiteHeader({ language = 'zh', rootPrefix = './', route = '', alternateRoute = 'en/' } = {}) {
  const english = language === 'en';
  const prefix = `${rootPrefix}${english ? 'en/' : ''}`;
  const current = route.replace(/^en\//, '');
  const items = [
    ['', 'navHome', '首页', 'Home'],
    ['providers/', 'navProviders', 'CDN 厂商', 'Providers'],
    ['blog/', 'navBlog', '博客', 'Journal'],
    ['lab/', 'navBench', '实测工具', 'Benchmark'],
    ['methodology/', 'navMethod', '测量说明', 'Methodology'],
  ];
  const links = items.map(([path, key, zh, en]) => {
    const selected = path ? current.startsWith(path) || path === 'blog/' && current.startsWith('article/') : current === '';
    const active = selected ? ` aria-current="${current === path ? 'page' : 'location'}"` : '';
    return `<a href="${escape(prefix + path)}" data-i18n="${key}"${active}>${english ? en : zh}</a>`;
  }).join('');
  const depth = route.split('/').filter(Boolean).length;
  const alternate = `${'../'.repeat(depth) || './'}${alternateRoute}`;
  return `<header class="site-header premium-header">
    <a class="brand" href="${escape(prefix)}" aria-label="CDN Bench"><span class="brand-symbol" aria-hidden="true"><svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11"/><ellipse cx="16" cy="16" rx="5" ry="11"/><path d="M5 16h22M7 10h18M7 22h18"/></svg></span><span class="brand-wordmark"><span>CDN<span class="brand-light">Bench</span><span class="brand-tag">LAB</span></span><small>INDEPENDENT EDGE RESEARCH</small></span></a>
    <nav id="site-navigation" class="header-nav" aria-label="${english ? 'Main navigation' : '主导航'}">${links}<span class="mobile-nav-note">CDN BENCH / ${english ? 'A clearer choice.' : '让选择更清晰。'}</span></nav>
    <div class="header-actions"><a id="language-toggle" class="language-button" href="${escape(alternate)}" aria-label="${english ? 'Switch to Chinese' : 'Switch to English'}">${english ? '中文' : 'EN'} ↗</a><button class="menu-toggle" type="button" aria-controls="site-navigation" aria-expanded="false" aria-label="${english ? 'Open menu' : '打开菜单'}"><span></span><span></span></button></div>
  </header>`;
}
