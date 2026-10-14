(() => {
  const railsVisible = window.matchMedia('(min-width: 1600px)');
  const slots = [...document.querySelectorAll('[data-ad-slot][data-ad-expires]')];
  const closed = new Set();
  const templates = new Map(slots.map(slot => [slot, slot.querySelector('template[data-ad-creative]')?.cloneNode(true)]));
  let expiryTimer;
  function refresh() {
    clearTimeout(expiryTimer);
    let nextExpiry = Infinity;
    const now = Date.now();
    for (const slot of slots) {
      const expires = Number(slot.dataset.adExpires);
      const active = !closed.has(slot) && (!expires || now < expires);
      slot.hidden = !active;
      if (expires > now) nextExpiry = Math.min(nextExpiry, expires);
      if (!active) { slot.querySelector('.site-ad-creative')?.replaceChildren(); continue; }
      if (slot.classList.contains('site-ad-rail') && !railsVisible.matches) {
        const template = templates.get(slot);
        if (template && !slot.querySelector('template[data-ad-creative]')) slot.querySelector('.site-ad-creative').replaceChildren(template.cloneNode(true));
        continue;
      }
      const template = slot.querySelector('template[data-ad-creative]');
      if (template) template.replaceWith(template.content.cloneNode(true));
    }
    if (Number.isFinite(nextExpiry)) expiryTimer = setTimeout(refresh, Math.min(nextExpiry - now + 10, 2147483647));
  }
  for (const slot of slots) slot.querySelector('.site-ad-close')?.addEventListener('click', () => { closed.add(slot); refresh(); });
  railsVisible.addEventListener('change', refresh);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
  window.addEventListener('pageshow', refresh);
  refresh();
})();
