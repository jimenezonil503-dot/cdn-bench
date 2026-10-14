const header = document.querySelector('.premium-header');
const toggle = header?.querySelector('.menu-toggle');
const menu = header?.querySelector('#site-navigation');
const english = document.documentElement.lang === 'en';
const mobile = window.matchMedia('(max-width: 1000px)');

function setMenu(open, returnFocus = false) {
  if (!toggle || !menu) return;
  header.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', english ? open ? 'Close menu' : 'Open menu' : open ? '关闭菜单' : '打开菜单');
  if (returnFocus) toggle.focus();
}

toggle?.addEventListener('click', event => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  setMenu(open);
  if (open && event.detail === 0) menu.querySelector('a')?.focus();
});
menu?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('click', event => { if (header && !header.contains(event.target)) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') setMenu(false, true); });
header?.addEventListener('focusout', event => { if (!header.contains(event.relatedTarget)) setMenu(false); });
mobile.addEventListener('change', () => setMenu(false));

for (const button of document.querySelectorAll('[data-copy-contact]')) {
  button.addEventListener('click', async () => {
    const status = document.getElementById('contact-copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copyContact);
      status.textContent = english ? 'Copied to clipboard.' : '联系方式已复制。';
    } catch {
      status.textContent = english ? 'Please select and copy the contact details above.' : '请选中上方联系方式进行复制。';
    }
  });
}

const rankings = document.querySelector('.home-rankings');
if (rankings) {
  const rows = [...rankings.querySelectorAll('.ranking-row')];
  const search = rankings.querySelector('#ranking-search');
  const filters = [...rankings.querySelectorAll('[data-ranking-filter]')];
  const more = rankings.querySelector('#ranking-more');
  const count = rankings.querySelector('#ranking-count');
  const empty = rankings.querySelector('.ranking-empty');
  let category = 'all';
  let expanded = false;
  const pageSize = 15;
  const refresh = () => {
    const query = search.value.trim().toLocaleLowerCase();
    const matches = rows.filter(row => (!query || row.dataset.search.includes(query)) && (category === 'all' || row.dataset.categories.split(' ').includes(category)));
    const visible = new Set(expanded ? matches : matches.slice(0, pageSize));
    for (const row of rows) row.hidden = !visible.has(row);
    count.textContent = english ? 'Showing ' + visible.size + ' of ' + matches.length + ' providers' : '展示 ' + visible.size + ' / ' + matches.length + ' 家服务商';
    empty.hidden = matches.length > 0;
    more.hidden = matches.length <= pageSize;
    more.setAttribute('aria-expanded', String(expanded));
    more.textContent = expanded ? (english ? 'Show fewer ↑' : '收起榜单 ↑') : (english ? 'Show all ' + matches.length + ' providers ↓' : '展开全部 ' + matches.length + ' 家服务商 ↓');
    for (const button of filters) button.setAttribute('aria-pressed', String(button.dataset.rankingFilter === category));
  };
  search.addEventListener('input', () => { expanded = false; refresh(); });
  for (const button of filters) button.addEventListener('click', () => { category = button.dataset.rankingFilter; expanded = false; refresh(); });
  more.addEventListener('click', () => { expanded = !expanded; refresh(); if (!expanded) rankings.scrollIntoView({ block: 'start', behavior: 'auto' }); });
  refresh();
}
