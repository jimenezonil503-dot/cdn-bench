import { DEFAULT_ENDPOINTS, MAX_BYTES, measureEndpoint, validateTestUrl, summarizeAttempts, createCsvReport } from './benchmark.js';
import { translate } from './i18n.js';
import { ARTICLES, PROVIDERS, articlePath, filterArticles, filterProviders, findArticle, findProvider, providerPath } from './platform.js';
import { articleLinkParts, renderArticleExtras } from './article-links.js';

const byId = identifier => document.getElementById(identifier);
const endpoints = DEFAULT_ENDPOINTS.map(endpoint => ({ ...endpoint }));
const selected = new Set(['jsdelivr', 'unpkg', 'cdnjs']);
const state = {
  language: document.documentElement.lang === 'en' ? 'en' : 'zh', status: 'idle', records: [], controller: null, startedAt: null,
  completed: 0, total: 0, rounds: 3, message: { key: 'readyHint', values: {} },
  reportUrl: null, compareSelection: new Set(), activeArticleId: null,
};
const siteRoot = new URL('./', import.meta.url);

const text = (key, values) => translate(state.language, key, values);
const number = (value, digits = 1) => value === null || value === undefined ? '—' : new Intl.NumberFormat(state.language === 'zh' ? 'zh-CN' : 'en-US', { maximumFractionDigits: digits }).format(value);
const element = (tag, className, content) => {
  const created = document.createElement(tag);
  if (className) created.className = className;
  if (content !== undefined) created.textContent = content;
  return created;
};

const localized = value => typeof value === 'string' ? value : value?.[state.language] ?? '';
function articleInline(tag, value) {
  const parent = element(tag);
  for (const part of articleLinkParts(localized(value))) {
    if (!part.href) { parent.append(document.createTextNode(part.text)); continue; }
    const link = element('a', '', part.text);
    link.href = part.external ? part.href : new URL(`${state.language === 'en' ? 'en/' : ''}${part.href}`, siteRoot).href;
    if (part.external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    parent.append(link);
  }
  return parent;
}
const categoryKey = category => ({ security: 'filterSecurity', cloud: 'filterCloud', programmable: 'filterProgrammable', delivery: 'filterDelivery' }[category] ?? 'filterAll');

function externalLink(url, label, className = '') {
  const link = element('a', className, label);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noreferrer noopener';
  return link;
}

function providerLogo(provider) {
  const frame = element('span', `provider-mark${provider.logoDark ? ' logo-dark' : ''}`);
  const image = element('img');
  image.src = new URL(provider.logo, siteRoot).href;
  image.alt = `${provider.name} logo`;
  image.width = 86;
  image.height = 48;
  image.loading = 'lazy';
  frame.append(image);
  return frame;
}

function renderProviderCard(provider) {
  const card = element('article', `provider-card provider-tone-${provider.tone}`);
  const top = element('div', 'provider-card-top');
  const mark = providerLogo(provider);
  const heading = element('div', 'provider-card-heading');
  heading.append(element('h3', '', provider.name), element('p', 'provider-tagline', localized(provider.tagline)));
  top.append(mark, heading);
  const categoryList = element('div', 'provider-tags');
  for (const category of provider.categories.slice(0, 3)) categoryList.append(element('span', '', text(categoryKey(category))));
  const intro = element('p', 'provider-intro', localized(provider.intro));
  const bestFor = element('p', 'provider-best');
  bestFor.append(element('strong', '', `${state.language === 'zh' ? '适合' : 'Best for'} · `), document.createTextNode(localized(provider.bestFor)));
  const source = element('span', 'provider-source-date', text('checkedOn', { date: provider.verified }));
  const actions = element('div', 'provider-actions');
  const profile = element('a', 'provider-profile-button', text('viewProfile'));
  profile.href = new URL(providerPath(provider.id, state.language), siteRoot).href;
  const compare = element('button', `compare-button${state.compareSelection.has(provider.id) ? ' selected' : ''}`, state.compareSelection.has(provider.id) ? text('compareAdded') : text('compareAdd'));
  compare.type = 'button';
  compare.setAttribute('aria-pressed', String(state.compareSelection.has(provider.id)));
  compare.setAttribute('aria-label', text('compareNamed', { name: provider.name }));
  compare.disabled = state.compareSelection.size >= 3 && !state.compareSelection.has(provider.id);
  compare.dataset.providerAction = 'compare';
  compare.dataset.providerId = provider.id;
  actions.append(profile, compare, externalLink(provider.officialUrl, text('officialSite'), 'provider-source-link'));
  card.append(top, categoryList, intro, bestFor, source, actions);
  return card;
}

function renderProviders() {
  const grid = byId('provider-grid');
  if (!grid) return;
  const query = byId('provider-search')?.value ?? '';
  const category = byId('provider-filter')?.value ?? 'all';
  const matches = filterProviders(query, category);
  grid.replaceChildren();
  if (!matches.length) grid.append(element('p', 'empty-platform-state', text('noProviders')));
  else matches.forEach(provider => grid.append(renderProviderCard(provider)));
  byId('provider-count').textContent = text('providerCount', { count: matches.length, total: PROVIDERS.length });
  byId('compare-notice').textContent = state.compareSelection.size >= 3 ? text('compareLimit') : '';
}

function renderBlog() {
  const grid = byId('blog-grid');
  if (!grid) return;
  const query = byId('blog-search')?.value ?? '';
  const matches = filterArticles(query);
  grid.replaceChildren();
  if (!matches.length) grid.append(element('p', 'empty-platform-state', text('noArticles')));
  for (const article of matches) {
    const card = element('article', 'blog-card');
    const meta = element('div', 'blog-meta');
    meta.append(element('span', 'blog-category', localized(article.category)), element('span', '', text('readingTime', { minutes: article.readTime })));
    const link = element('a', 'blog-card-link');
    link.href = new URL(articlePath(article.id, state.language), siteRoot).href;
    link.append(element('h3', '', localized(article.title)), element('p', '', localized(article.excerpt)), element('span', 'read-more', text('readArticle')));
    card.append(meta, link, element('span', 'blog-date', article.date));
    grid.append(card);
  }
  byId('blog-count').textContent = text('articleCount', { count: matches.length });
}

function renderArticleReader() {
  const reader = byId('article-reader');
  if (!reader) return;
  const article = findArticle(state.activeArticleId);
  reader.replaceChildren();
  document.title = article ? `${localized(article.title)} · CDN Bench` : text('title');
  const description = document.querySelector('meta[name="description"]');
  if (description) description.content = article ? localized(article.excerpt) : text('metaDescription');
  if (!article) {
    reader.hidden = !state.activeArticleId;
    if (state.activeArticleId) {
      const back = element('a', 'article-back', text('backBlog'));
      back.href = '#blog';
      reader.append(element('p', 'empty-platform-state', text('routeNotFound')), back);
    }
    return;
  }
  reader.hidden = false;
  const back = element('a', 'article-back', text('backBlog'));
  back.href = '#blog';
  const header = element('header', 'article-header');
  header.append(element('span', 'blog-category', localized(article.category)), element('h1', '', localized(article.title)), element('p', 'article-excerpt', localized(article.excerpt)));
  const byline = element('div', 'article-byline');
  byline.append(element('span', '', `${text('articleAuthor')} · ${article.date}`), element('span', '', text('readingTime', { minutes: article.readTime })));
  const body = element('div', 'article-body');
  for (const section of article.sections) {
    const block = element('section', 'article-block');
    block.append(element('h2', '', localized(section.heading)));
    for (const paragraph of section.paragraphs ?? []) block.append(articleInline('p', paragraph));
    if (section.bullets?.length) {
      const list = element('ul');
      for (const bullet of section.bullets) list.append(articleInline('li', bullet));
      block.append(list);
    }
    block.insertAdjacentHTML('beforeend', renderArticleExtras(section, state.language, siteRoot.href));
    body.append(block);
  }
  const sourceBox = element('aside', 'article-sources');
  sourceBox.append(element('strong', '', text('articleSources')), element('p', '', text('articleNote')));
  for (const source of article.sources) sourceBox.append(externalLink(source.url, localized(source.label), 'article-source-link'));
  reader.append(back, header, byline, body, sourceBox);
}

function renderCompareTray() {
  const tray = byId('compare-tray');
  if (!tray) return;
  const names = [...state.compareSelection].map(id => findProvider(id)?.name).filter(Boolean);
  tray.hidden = !names.length;
  byId('compare-selection').textContent = names.join(' · ');
  byId('open-compare').disabled = names.length < 2;
  byId('compare-tray-hint').textContent = names.length < 2 ? text('compareEmpty') : '';
}

function renderCompareDialog() {
  const content = byId('compare-content');
  if (!content) return;
  content.replaceChildren();
  const providers = [...state.compareSelection].map(findProvider).filter(Boolean);
  if (providers.length < 2) {
    content.append(element('p', 'empty-platform-state', text('compareEmpty')));
    return;
  }
  const table = document.createElement('table');
  table.className = 'compare-table';
  const head = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.append(element('th', '', text('compareTitle')));
  providers.forEach(provider => {
    const heading = element('th');
    const link = element('a', 'compare-profile-link', provider.name);
    link.href = new URL(providerPath(provider.id, state.language), siteRoot).href;
    heading.append(providerLogo(provider), link);
    headRow.append(heading);
  });
  head.append(headRow);
  const body = document.createElement('tbody');
  const rows = [['delivery', 'compareDelivery'], ['security', 'compareSecurity'], ['edge', 'compareEdge'], ['origin', 'compareOrigin'], ['fit', 'compareFit'], ['evidence', 'compareEvidence']];
  for (const [field, labelKey] of rows) {
    const row = document.createElement('tr');
    row.append(element('th', '', text(labelKey)));
    for (const provider of providers) row.append(element('td', '', field === 'evidence' ? text('notTested') : localized(provider.compare[field])));
    body.append(row);
  }
  const sources = element('tr');
  sources.append(element('th', '', text('compareSources')));
  for (const provider of providers) {
    const cell = element('td');
    cell.append(externalLink(provider.sourceUrl ?? provider.officialUrl, localized(provider.sourceLabel), 'provider-source-link'));
    sources.append(cell);
  }
  body.append(sources);
  head.querySelectorAll('th').forEach(cell => { cell.scope = 'col'; });
  body.querySelectorAll('th').forEach(cell => { cell.scope = 'row'; });
  table.append(head, body);
  content.append(table);
}

function syncHashRoute() {
  state.activeArticleId = location.hash.startsWith('#article/') ? location.hash.slice('#article/'.length) || 'not-found' : null;
  renderArticleReader();
  if (state.activeArticleId) byId('article-reader')?.scrollIntoView({ block: 'start' });
}

function renderPlatform() {
  byId('provider-total')?.replaceChildren(document.createTextNode(String(PROVIDERS.length)));
  byId('article-total')?.replaceChildren(document.createTextNode(String(ARTICLES.length)));
  byId('compare-tray')?.setAttribute('aria-label', text('compareTrayTitle'));
  const providerSearch = byId('provider-search');
  const blogSearch = byId('blog-search');
  if (providerSearch) providerSearch.placeholder = text('searchPlaceholder');
  if (blogSearch) blogSearch.placeholder = text('articleSearchPlaceholder');
  renderProviders();
  renderBlog();
  renderArticleReader();
  renderCompareTray();
  if (byId('compare-dialog')?.open) renderCompareDialog();
}

function setMessage(key, values = {}) {
  state.message = { key, values };
  byId('live-status').textContent = text(key, values);
}

function errorText(attempt) {
  const errorKeys = { timeout: 'timeoutError', network: 'networkError', tooLarge: 'tooLargeError', empty: 'emptyError', http: 'httpError', html: 'htmlError', invalidUrl: 'invalidUrl', publicUrlRequired: 'publicUrlRequired' };
  return text(errorKeys[attempt.errorCode] ?? 'networkError', { detail: attempt.detail ?? '' });
}

function renderEndpoints() {
  const list = byId('endpoint-list');
  if (!list) return;
  list.replaceChildren();
  for (const endpoint of endpoints) {
    const wrapper = element('div', 'endpoint-wrapper');
    const card = element('label', 'endpoint-card');
    const checkbox = element('input');
    checkbox.type = 'checkbox';
    checkbox.value = endpoint.id;
    checkbox.checked = selected.has(endpoint.id);
    checkbox.disabled = state.status === 'running';
    checkbox.setAttribute('aria-label', text('selectNode', { name: endpoint.name }));
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selected.add(endpoint.id);
      else selected.delete(endpoint.id);
      renderControls();
    });
    const icon = element('span', 'endpoint-icon', endpoint.logo ? undefined : endpoint.icon ?? '↗');
    if (endpoint.logo) {
      const image = element('img');
      image.src = new URL(endpoint.logo, siteRoot).href;
      image.alt = `${endpoint.name} logo`;
      image.width = 38;
      image.height = 30;
      icon.append(image);
    }
    icon.style.setProperty('--node-color', endpoint.color ?? '#6c8b49');
    icon.style.setProperty('--node-bg', endpoint.background ?? '#f0f4e7');
    icon.setAttribute('aria-hidden', 'true');
    const label = element('span', 'endpoint-text');
    label.append(element('span', 'endpoint-name', endpoint.name), element('span', 'endpoint-host', new URL(endpoint.url).hostname));
    const indicator = element('span', 'check-indicator', '✓');
    indicator.setAttribute('aria-hidden', 'true');
    card.append(checkbox, icon, label, indicator);
    wrapper.append(card);
    if (endpoint.custom) {
      const remove = element('button', 'remove-node', '×');
      remove.type = 'button';
      remove.disabled = state.status === 'running';
      remove.setAttribute('aria-label', text('removeNode', { name: endpoint.name }));
      remove.addEventListener('click', event => {
        event.preventDefault();
        const position = endpoints.findIndex(candidate => candidate.id === endpoint.id);
        endpoints.splice(position, 1);
        selected.delete(endpoint.id);
        renderEndpoints();
        renderControls();
      });
      wrapper.append(remove);
    }
    list.append(wrapper);
  }
}

function renderControls() {
  if (!byId('rounds')) return;
  const active = state.status === 'running';
  const chosen = endpoints.filter(endpoint => selected.has(endpoint.id));
  const rounds = Number(byId('rounds').value);
  const knownBytes = chosen.reduce((total, endpoint) => total + (endpoint.bytes ?? 0), 0) * rounds;
  const hasCustom = chosen.some(endpoint => endpoint.custom);
  byId('summary-nodes').textContent = String(chosen.length);
  byId('estimate').textContent = `${hasCustom && !knownBytes ? '' : `≈ ${number(knownBytes / 1000000)} MB`}${hasCustom ? ` ${text('customVolume')}` : ''}`.trim();
  byId('summary-status').textContent = text(state.status);
  byId('select-all').textContent = text(selected.size === endpoints.length ? 'deselectAll' : 'selectAll');
  byId('start-test').disabled = active || !chosen.length;
  byId('stop-test').hidden = !active;
  byId('stop-test').disabled = Boolean(state.controller?.signal.aborted);
  for (const control of document.querySelectorAll('#rounds, #timeout, #custom-form input, #custom-form button, #select-all, #add-toggle')) control.disabled = active;
  byId('export-csv').disabled = active || !state.records.some(record => record.attempts.length);
  byId('progress-block').hidden = !state.total;
  byId('test-progress').max = Math.max(1, state.total);
  byId('test-progress').value = state.completed;
  byId('test-progress').setAttribute('aria-label', text('progress'));
  byId('progress-label').textContent = text('progress');
  byId('progress-count').textContent = `${state.completed} / ${state.total}`;
  byId('live-status').textContent = text(state.message.key, state.message.values);
}

function renderResults() {
  const body = byId('results-body');
  if (!body) return;
  body.replaceChildren();
  const summaries = state.records.map(record => ({ record, summary: summarizeAttempts(record.attempts) }));
  if (!summaries.length) {
    const row = element('tr');
    const cell = element('td', 'empty-table', text('resultsEmpty'));
    cell.colSpan = 5;
    row.append(cell);
    body.append(row);
  }
  for (const { record, summary } of summaries) {
    const row = element('tr');
    const nameCell = element('td', '', record.endpoint.name);
    const lastError = record.attempts.findLast(attempt => attempt.status === 'error');
    if (lastError) nameCell.append(element('span', 'result-error', errorText(lastError)));
    row.append(nameCell, element('td', '', number(summary.responseMs)), element('td', '', number(summary.throughputMbps, 2)), element('td', '', `${summary.successCount} / ${summary.attemptedCount}`));
    const statusCell = element('td');
    const displayStatus = record.status === 'pending' && state.status === 'stopped' ? 'idle' : record.status;
    const className = record.status === 'done' ? 'success' : record.status === 'failed' ? 'failed' : record.status === 'running' ? 'running' : '';
    statusCell.append(element('span', `result-status ${className}`, text(displayStatus)));
    row.append(statusCell);
    body.append(row);
  }
  const successful = summaries.filter(entry => entry.summary.successCount > 0);
  byId('summary-latency').textContent = number(successful.length ? Math.min(...successful.map(entry => entry.summary.responseMs)) : null);
  byId('summary-speed').textContent = number(successful.length ? Math.max(...successful.map(entry => entry.summary.throughputMbps)) : null, 2);
  renderChart(successful);
  if (state.startedAt) {
    const timestamp = new Date(state.startedAt).toLocaleString(state.language === 'zh' ? 'zh-CN' : 'en-US');
    byId('run-info').textContent = text('runInfo', {
      time: timestamp, nodes: state.records.length, rounds: state.rounds, completed: state.completed, total: state.total,
      bytes: number(summaries.reduce((total, entry) => total + entry.summary.decodedBytes, 0) / 1000000, 2),
    });
  }
}

function renderChart(successful) {
  const chart = byId('response-chart');
  chart.replaceChildren();
  if (!successful.length) {
    const empty = element('div', 'empty-chart');
    const bars = element('div', 'empty-chart-icon');
    bars.setAttribute('aria-hidden', 'true');
    for (let index = 0; index < 4; index += 1) bars.append(element('i'));
    const failed = state.records.length && state.status !== 'running';
    empty.append(bars, element('strong', '', text(failed ? 'chartNoSuccess' : 'chartEmptyTitle')), element('p', '', text(failed ? 'chartNoSuccessDescription' : 'chartEmptyDescription')));
    const axis = element('span', 'empty-axis', '0');
    for (const tick of ['250', '500', '750 ms']) axis.append(element('span', '', tick));
    axis.setAttribute('aria-hidden', 'true');
    empty.append(axis);
    chart.append(empty);
    return;
  }
  const sorted = successful.slice().sort((first, second) => first.summary.responseMs - second.summary.responseMs);
  const maxValue = Math.max(1, ...sorted.map(entry => entry.summary.responseMs));
  sorted.forEach(({ record, summary }, index) => {
    const row = element('div', `chart-row${index === 0 ? ' best' : ''}`);
    const track = element('div', 'chart-track');
    const bar = element('div', 'chart-bar');
    bar.style.width = `${Math.max(1, summary.responseMs / maxValue * 100)}%`;
    track.append(bar);
    row.append(element('span', 'chart-name', record.endpoint.name), track, element('span', 'chart-value', `${number(summary.responseMs)} ms`));
    chart.append(row);
  });
  chart.append(element('p', 'chart-caption', text('chartPartial')));
}

function renderLanguage() {
  document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
  for (const node of document.querySelectorAll('[data-i18n]')) node.textContent = text(node.dataset.i18n);
  byId('language-toggle')?.replaceChildren(document.createTextNode(state.language === 'zh' ? 'EN ↗' : '中文 ↗'));
  byId('language-toggle')?.setAttribute('aria-label', state.language === 'zh' ? 'Switch to English' : '切换到中文');
  renderPlatform();
  renderEndpoints();
  renderControls();
  renderResults();
}

async function startBenchmark() {
  if (state.status === 'running') return;
  const chosen = endpoints.filter(endpoint => selected.has(endpoint.id));
  if (!chosen.length) return setMessage('noSelection');
  state.controller = new AbortController();
  const signal = state.controller.signal;
  state.status = 'running';
  state.rounds = Number(byId('rounds').value);
  const timeoutMs = Number(byId('timeout').value);
  state.records = chosen.map(endpoint => ({ endpoint: { ...endpoint }, attempts: [], status: 'pending' }));
  state.startedAt = new Date().toISOString();
  if (state.reportUrl) URL.revokeObjectURL(state.reportUrl);
  state.reportUrl = null;
  byId('report-panel').hidden = true;
  byId('report-content').value = '';
  byId('report-download').removeAttribute('href');
  state.completed = 0;
  state.total = chosen.length * state.rounds;
  renderEndpoints();
  renderControls();
  renderResults();
  let unexpected = false;
  try {
    for (const record of state.records) {
      if (signal.aborted) break;
      record.status = 'running';
      for (let round = 1; round <= state.rounds; round += 1) {
        if (signal.aborted) break;
        setMessage('testing', { name: record.endpoint.name, round, rounds: state.rounds });
        renderResults();
        try {
          const attempt = await measureEndpoint(record.endpoint, { signal, timeoutMs, maxBytes: MAX_BYTES });
          record.attempts.push({ ...attempt, round });
          state.completed += 1;
        } catch (error) {
          if (error.code === 'cancelled' || signal.aborted) {
            record.attempts.push({ status: 'cancelled', round });
            break;
          }
          record.attempts.push({ status: 'error', round, errorCode: error.code ?? 'network', detail: error.detail ?? '' });
          state.completed += 1;
        }
        renderControls();
        renderResults();
      }
      const summary = summarizeAttempts(record.attempts);
      record.status = signal.aborted ? 'cancelled' : summary.successCount === state.rounds ? 'done' : summary.successCount ? 'partial' : 'failed';
      renderResults();
    }
  } catch {
    unexpected = true;
    state.controller.abort();
  } finally {
    state.status = signal.aborted ? 'stopped' : 'complete';
    const totals = state.records.map(record => summarizeAttempts(record.attempts));
    if (unexpected) setMessage('unexpectedError');
    else if (signal.aborted) setMessage('stoppedMessage');
    else setMessage('finished', { success: totals.reduce((total, summary) => total + summary.successCount, 0), attempted: state.completed });
    state.controller = null;
    renderEndpoints();
    renderControls();
    renderResults();
  }
}

byId('language-toggle')?.addEventListener('click', event => {
  event.preventDefault();
  const destination = new URL(event.currentTarget.href);
  destination.hash = location.hash;
  location.assign(destination.href);
});
byId('select-all')?.addEventListener('click', () => {
  const allSelected = selected.size === endpoints.length;
  selected.clear();
  if (!allSelected) for (const endpoint of endpoints) selected.add(endpoint.id);
  renderEndpoints();
  renderControls();
});
byId('rounds')?.addEventListener('change', renderControls);
byId('add-toggle')?.addEventListener('click', () => {
  const form = byId('custom-form');
  form.hidden = !form.hidden;
  byId('add-toggle').setAttribute('aria-expanded', String(!form.hidden));
  if (!form.hidden) byId('custom-name').focus();
});
byId('custom-form')?.addEventListener('submit', event => {
  event.preventDefault();
  byId('custom-error').textContent = '';
  try {
    if (endpoints.length >= 8) throw { code: 'tooMany' };
    const name = byId('custom-name').value.trim();
    if (!name || name.length > 36) throw { code: 'emptyName' };
    const url = validateTestUrl(byId('custom-url').value);
    if (endpoints.some(endpoint => endpoint.url === url)) throw { code: 'duplicate' };
    const endpoint = { id: `custom-${crypto.randomUUID()}`, name, url, custom: true, icon: '↗' };
    endpoints.push(endpoint);
    selected.add(endpoint.id);
    byId('custom-form').reset();
    byId('custom-form').hidden = true;
    byId('add-toggle').setAttribute('aria-expanded', 'false');
    renderEndpoints();
    renderControls();
    byId('add-toggle').focus();
  } catch (error) {
    byId('custom-error').textContent = text(error.code ?? 'invalidUrl');
  }
});
byId('start-test')?.addEventListener('click', startBenchmark);
byId('stop-test')?.addEventListener('click', () => {
  if (state.controller) {
    state.controller.abort();
    setMessage('stopping');
    byId('stop-test').disabled = true;
  }
});
byId('export-csv')?.addEventListener('click', () => {
  const content = createCsvReport(state.records, state.startedAt);
  if (state.reportUrl) URL.revokeObjectURL(state.reportUrl);
  state.reportUrl = URL.createObjectURL(new Blob([content], { type: 'text/csv;charset=utf-8' }));
  const link = byId('report-download');
  link.href = state.reportUrl;
  link.download = `cdn-bench-${state.startedAt.replaceAll(':', '-')}.csv`;
  byId('report-content').value = content;
  byId('report-panel').hidden = false;
  byId('report-content').focus();
});
byId('provider-search')?.addEventListener('input', renderProviders);
byId('provider-filter')?.addEventListener('change', renderProviders);
byId('blog-search')?.addEventListener('input', renderBlog);
byId('provider-grid')?.addEventListener('click', event => {
  const action = event.target.closest('[data-provider-action]');
  if (!action) return;
  const id = action.dataset.providerId;
  if (action.dataset.providerAction === 'compare') {
    if (state.compareSelection.has(id)) state.compareSelection.delete(id);
    else if (state.compareSelection.size < 3) state.compareSelection.add(id);
    else return;
    renderProviders();
    renderCompareTray();
    byId('provider-grid').querySelector(`[data-provider-action="compare"][data-provider-id="${id}"]`)?.focus({ preventScroll: true });
  }
});
byId('clear-compare')?.addEventListener('click', () => {
  state.compareSelection.clear();
  renderProviders();
  renderCompareTray();
});
byId('open-compare')?.addEventListener('click', () => {
  if (state.compareSelection.size < 2) return;
  renderCompareDialog();
  const dialog = byId('compare-dialog');
  dialog.showModal();
});
byId('close-compare')?.addEventListener('click', () => byId('compare-dialog')?.close());
byId('compare-dialog')?.addEventListener('click', event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
window.addEventListener('hashchange', syncHashRoute);
syncHashRoute();
renderLanguage();
