const byId = identifier => document.getElementById(identifier);
const state = { session: null, data: null, view: 'providers', adLanguage: 'zh', busy: false, editing: null, dirty: false };
let submissions = null;
let submissionRequest = 0;
let submissionSearchTimer;
let submissionLoading = false;
const blankCopy = () => ({ zh: '', en: '' });
const today = () => new Date().toLocaleDateString('en-CA');
const categoryLabels = { security: '安全与防护', cloud: '云生态集成', programmable: '可编程边缘', delivery: '内容交付' };
const adLabels = { top: '顶部横幅', left: '左侧悬浮', right: '右侧悬浮' };
const adTypes = { placeholder: '合作占位', image: '图片广告', code: '代码广告' };
const adLanguageLabels = { zh: '中文广告', en: '英文广告' };
const adImageSource = path => path.startsWith('assets/ads/') ? './api/ad-image/' + path.slice('assets/ads/'.length) : path;

function node(tag, className = '', text) {
  const created = document.createElement(tag);
  if (className) created.className = className;
  if (text !== undefined) created.textContent = text;
  return created;
}

function action(label, className, handler) {
  const button = node('button', className, label);
  button.type = 'button';
  button.addEventListener('click', handler);
  return button;
}

function notice(message, failure = false) {
  const target = byId('workspace-message');
  target.textContent = message;
  target.hidden = !message;
  target.classList.toggle('failure', failure);
}

function showLogin(message = '') {
  state.session = null;
  state.data = null;
  submissions = null;
  submissionRequest++;
  clearTimeout(submissionSearchTimer);
  state.editing = null;
  state.dirty = false;
  if (byId('editor').open) byId('editor').close();
  byId('editor-fields').replaceChildren();
  byId('content-list').replaceChildren();
  byId('current-user').textContent = '';
  byId('workspace').hidden = true;
  byId('boot-message').hidden = true;
  byId('login-view').hidden = false;
  byId('login-password').value = '';
  byId('login-error').textContent = message;
}

async function api(path, method = 'GET', value) {
  const headers = {};
  if (value !== undefined) headers['Content-Type'] = 'application/json';
  if (method !== 'GET' && state.session) headers['X-CSRF-Token'] = state.session.csrfToken;
  let response;
  try {
    response = await fetch('./api/' + path, { method, headers, credentials: 'same-origin', cache: 'no-store', body: value === undefined ? undefined : JSON.stringify(value) });
  } catch {
    throw new Error('无法连接后台，请检查服务是否正在运行。');
  }
  const result = await response.json().catch(() => ({ error: '后台返回了无法读取的内容，请重试。' }));
  if (!response.ok) {
    if (response.status === 401 && state.session) showLogin('登录已过期，请重新登录。');
    const error = new Error(result.error || '操作未成功，请重试。');
    error.status = response.status;
    throw error;
  }
  return result;
}

function setBusy(value) {
  state.busy = value;
  for (const button of document.querySelectorAll('#workspace button, #editor button, #login-submit')) button.disabled = value;
  if (!value && state.data) byId('publish').disabled = Boolean(state.data.publishedAt && state.data.revision === state.data.publishedRevision);
  byId('editor').setAttribute('aria-busy', String(value));
}

function dateTime(value) {
  return value ? new Date(value).toLocaleString('zh-CN', { hour12: false }) : '尚未通过后台发布';
}

function render() {
  if (!state.data) return;
  const providersView = state.view === 'providers';
  const contactView = state.view === 'contact';
  const advertisingView = state.view === 'advertising';
  const submissionView = state.view === 'submissions';
  byId('add-item').disabled = state.busy;
  document.querySelector('.stats-grid').hidden = submissionView;
  document.querySelector('.publish-bar').hidden = submissionView;
  document.querySelector('.list-footer > span:last-child').textContent = submissionView ? '留言仅管理员可见' : '更改需发布后才对读者可见';
  const { providers, articles } = state.data;
  const unpublished = !state.data.publishedAt || state.data.revision !== state.data.publishedRevision;
  const title = submissionView ? '提交信息' : advertisingView ? '广告管理' : contactView ? '联系我们' : providersView ? '商家管理' : '博客管理';
  byId('view-title').textContent = title;
  byId('breadcrumb-title').textContent = title;
  byId('view-description').textContent = submissionView ? '查看访客提交的标题、内容和联系方式，最新信息排在前面。' : advertisingView ? '中文与英文广告独立投放，分别配置素材、链接与到期日期。' : contactView ? '设置中英文联系页面标题与简介。访客信息在“提交信息”中查看。' : providersView ? '维护服务商资料、产品亮点和选型档案。' : '撰写双语文章，管理草稿与前台发布状态。';
  byId('add-item').textContent = submissionView ? '刷新列表' : advertisingView ? '配置顶部横幅' : contactView ? '编辑联系页面' : providersView ? '＋ 新增商家' : '＋ 撰写文章';
  byId('list-title').textContent = submissionView ? '收到的信息' : advertisingView ? '全站广告位' : contactView ? '联系页面文案' : providersView ? '商家档案' : '博客文章';
  byId('content-search').closest('label').hidden = contactView || advertisingView;
  byId('content-search').placeholder = submissionView ? '搜索标题、内容或联系方式…' : providersView ? '搜索商家名称或定位…' : '搜索文章标题或分类…';
  byId('provider-stat').textContent = providers.length;
  byId('provider-nav-count').textContent = providers.length;
  byId('article-stat').textContent = articles.length;
  byId('article-nav-count').textContent = articles.length;
  const drafts = articles.filter(article => article.status === 'draft').length;
  byId('article-status-stat').textContent = drafts + ' 篇草稿 · ' + (articles.length - drafts) + ' 篇公开文章';
  byId('publish-stat').textContent = unpublished ? '待发布' : '已同步';
  byId('published-at').textContent = state.data.publishedAt ? '上次发布 · ' + dateTime(state.data.publishedAt) : '尚未通过后台发布';
  byId('publish-heading').textContent = unpublished ? '后台内容尚未同步前台' : '已保存的公开内容已同步';
  byId('save-state').textContent = (state.data.savedAt ? '已保存 · ' + dateTime(state.data.savedAt) + '。' : '') + (advertisingView ? '广告更改发布后生效。到期自动下线，无需再次发布。' : '仅“发布后公开”的文章会出现在前台，草稿保持私有。');
  byId('publish').disabled = state.busy || !unpublished;
  for (const button of document.querySelectorAll('[data-view]')) button.classList.toggle('active', button.dataset.view === state.view);
  if (submissionView) { renderSubmissions(); return; }
  if (contactView) { renderContactSettings(); return; }
  if (advertisingView) { renderAdvertisingSettings(); return; }
  const query = byId('content-search').value.trim().toLocaleLowerCase();
  const items = state.data[state.view].filter(item => JSON.stringify(providersView ? [item.name, item.tagline] : [item.title, item.category]).toLocaleLowerCase().includes(query));
  const list = byId('content-list');
  list.replaceChildren();
  for (const item of items) {
    const row = node('article', 'content-row');
    if (providersView) {
      const image = node('img', 'row-image');
      image.src = /^https:/.test(item.logo) ? item.logo : '../' + item.logo;
      image.alt = item.name + ' Logo';
      image.loading = 'lazy';
      image.addEventListener('error', () => { image.src = '../favicon.svg'; }, { once: true });
      row.append(image);
    } else row.append(node('span', 'row-image article-mark', '▤'));
    const content = node('div', 'row-copy');
    content.append(node('div', 'row-title', providersView ? item.name : item.title.zh));
    content.append(node('p', 'row-description', providersView ? item.tagline.zh : item.excerpt.zh));
    const metadata = node('div', 'row-meta');
    metadata.append(node('span', '', '/' + (providersView ? 'providers' : 'article') + '/' + item.id + '/'));
    metadata.append(node('span', '', providersView ? item.verified : item.date));
    content.append(metadata);
    const badge = node('span', 'badge' + (!providersView && item.status === 'draft' ? ' draft' : ''), providersView ? '商家档案' : item.status === 'draft' ? '私有草稿' : '发布后公开');
    const buttons = node('div', 'row-actions');
    buttons.append(action('编辑', '', () => openEditor(item)));
    buttons.append(action('删除', 'danger', () => deleteItem(item)));
    row.append(content, badge, buttons);
    list.append(row);
  }
  if (!items.length) list.append(node('div', 'empty-list', query ? '没有找到匹配内容，试试其他关键词。' : providersView ? '尚无商家，点击“新增商家”开始。' : '尚无文章，点击“撰写文章”开始。'));
  byId('list-count').textContent = '显示 ' + items.length + ' / ' + state.data[state.view].length + ' 条';
}

async function loadSubmissions(page = 1) {
  const request = ++submissionRequest;
  submissionLoading = true;
  render();
  try {
    const query = new URLSearchParams({ q: byId('content-search').value.trim(), page: String(page) });
    const result = await api('submissions?' + query);
    if (request !== submissionRequest || !state.session) return;
    submissions = result;
  } catch (error) {
    if (request === submissionRequest && state.session) { submissions = null; notice(error.message, true); }
  } finally {
    if (request === submissionRequest) { submissionLoading = false; if (state.view === 'submissions') render(); }
  }
}

function renderSubmissions() {
  const list = byId('content-list'); list.replaceChildren();
  byId('add-item').disabled = submissionLoading;
  byId('list-count').textContent = '';
  if (submissionLoading) { list.append(node('p', 'empty-list', '正在载入信息…')); return; }
  if (!submissions) { list.append(node('p', 'empty-list', '未能载入信息，请点击“刷新列表”重试。')); return; }
  for (const item of submissions.items) {
    const row = node('details', 'submission-row');
    const summary = node('summary', 'submission-summary');
    const heading = node('div', 'submission-heading');
    heading.append(node('strong', '', item.title), node('span', 'muted', item.contact));
    const meta = node('div', 'submission-meta');
    meta.append(node('span', 'badge', item.language === 'en' ? '英文页面' : '中文页面'), node('time', '', dateTime(item.createdAt)), node('span', 'submission-expand', '查看详情'));
    summary.append(heading, meta);
    const body = node('dl', 'submission-details');
    for (const [label, value] of [['标题', item.title], ['内容', item.content], ['联系方式', item.contact]]) {
      body.append(node('dt', '', label), node('dd', '', value));
    }
    row.append(summary, body); list.append(row);
  }
  if (!submissions.items.length) list.append(node('p', 'empty-list', byId('content-search').value.trim() ? '没有找到匹配信息。' : '暂时没有提交信息。访客提交后会显示在这里。'));
  byId('list-count').textContent = '共 ' + submissions.total + ' 条 · 第 ' + submissions.page + ' / ' + submissions.pages + ' 页';
  if (submissions.pages > 1) {
    const pager = node('div', 'submission-pagination');
    const previous = action('上一页', 'secondary', () => loadSubmissions(submissions.page - 1));
    const next = action('下一页', 'secondary', () => loadSubmissions(submissions.page + 1));
    previous.disabled = submissions.page <= 1; next.disabled = submissions.page >= submissions.pages;
    pager.append(previous, next); list.append(pager);
  }
}

function renderAdvertisingSettings() {
  const list = byId('content-list');
  list.replaceChildren();
  const language = state.adLanguage;
  const languageBar = node('div', 'ad-language-bar');
  const tabs = node('div', 'ad-language-tabs');
  tabs.setAttribute('role', 'tablist'); tabs.setAttribute('aria-label', '广告投放语言');
  for (const [key, label] of Object.entries(adLanguageLabels)) {
    const tab = action(label, 'ad-language-tab' + (key === language ? ' active' : ''), () => {
      if (state.busy) return;
      state.adLanguage = key; notice(''); renderAdvertisingSettings();
    });
    tab.dataset.adLanguage = key; tab.setAttribute('role', 'tab'); tab.setAttribute('aria-selected', String(key === language)); tab.tabIndex = key === language ? 0 : -1;
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key) || state.busy) return;
      event.preventDefault(); state.adLanguage = event.key === 'Home' ? 'zh' : event.key === 'End' ? 'en' : language === 'zh' ? 'en' : 'zh';
      renderAdvertisingSettings(); byId('content-list').querySelector('[aria-selected="true"]').focus();
    });
    tabs.append(tab);
  }
  languageBar.append(tabs, node('p', 'muted', language === 'zh' ? '仅投放中文页面 · 英文页面使用英文广告设置' : '仅投放 /en/ 英文页面 · 中文页面使用中文广告设置'));
  list.append(languageBar);
  const grid = node('div', 'advertising-grid');
  for (const [position, label] of Object.entries(adLabels)) {
    const ad = state.data.advertising[language][position];
    const expired = ad.expiresOn && Date.now() >= Date.parse(ad.expiresOn + 'T16:00:00.000Z');
    const card = node('article', 'advertising-card');
    const illustration = node('div', 'ad-placement-map placement-' + position);
    illustration.setAttribute('aria-hidden', 'true');
    for (const area of ['nav', 'top', 'left', 'body', 'right']) illustration.append(node('span', 'map-' + area));
    card.append(illustration);
    const heading = node('div', 'ad-card-heading');
    heading.append(node('h3', '', label), node('span', 'badge' + (!ad.enabled || expired ? ' draft' : ''), !ad.enabled ? '已停用' : expired ? '已到期' : '已启用'));
    card.append(heading, node('p', 'muted', adTypes[ad.type] + ' · 高度 ' + ad.height + ' px'));
    card.append(node('p', 'ad-card-expiry', ad.expiresOn ? '到期：' + ad.expiresOn + ' 23:59:59（UTC+8）' : '长期展示 · 未设置到期日期'));
    card.append(node('p', 'field-hint', (language === 'zh' ? '中文页面，' : '英文页面，') + (position === 'top' ? '与导航等宽。' : '宽屏悬浮展示，可关闭。')));
    const actions = node('div', 'ad-card-actions');
    actions.append(action('编辑广告', 'primary', () => openEditor({ id: position })));
    actions.append(action(ad.enabled ? '停用' : '启用', 'secondary', async () => {
      if (state.busy) return;
      setBusy(true);
      try {
        const next = structuredClone(state.data);
        next.advertising[language][position].enabled = !ad.enabled;
        state.data = await api('data', 'PUT', next);
        render(); notice('广告设置已保存，点击“发布到前台”生效。');
      } catch (error) { notice(error.message, true); }
      finally { setBusy(false); }
    }));
    card.append(actions); grid.append(card);
  }
  list.append(grid);
  byId('list-count').textContent = adLanguageLabels[language] + ' · 3 个广告位 · 到期按 UTC+8 日期计算';
}

function advertisingEditor(parent, draft, position) {
  const basic = section(parent, '投放设置');
  const enabledLabel = node('label', 'contact-visible-checkbox', '启用此广告位');
  const enabled = node('input'); enabled.type = 'checkbox'; enabled.checked = draft.enabled;
  enabledLabel.prepend(enabled); basic.append(enabledLabel);
  const grid = node('div', 'field-grid'); basic.append(grid);
  const type = select(grid, '广告类型', draft.type, Object.entries(adTypes));
  const height = field(grid, '展示高度（px）', draft.height, { type: 'number' });
  height.min = '88'; height.max = position === 'top' ? '600' : '1200'; height.step = '1';
  const expiry = field(grid, '到期日期（留空长期展示）', draft.expiresOn, { type: 'date', required: false });
  expiry.min = '2000-01-01'; expiry.max = '9999-12-30';
  basic.append(node('p', 'field-hint', '广告在所选日期 23:59:59（UTC+8）结束后自动下线。左右悬浮广告宽 128 px；屏幕不足 1600 px 时收起，避免遮挡正文。'));

  const imageSection = section(parent, '图片素材');
  const image = field(imageSection, '图片 HTTPS 地址或已上传图片路径', draft.image, { required: false, limit: 2048 });
  const file = field(imageSection, '上传图片（PNG / JPG / GIF / WebP，最大 5 MB）', '', { type: 'file', required: false });
  file.accept = 'image/png,image/jpeg,image/gif,image/webp';
  const uploadStatus = node('p', 'field-hint'); uploadStatus.setAttribute('role', 'status'); imageSection.append(uploadStatus);
  const link = field(imageSection, '点击跳转 HTTPS 地址（可留空）', draft.link, { type: 'url', required: false, limit: 2048 });
  const alt = field(imageSection, '图片替代文本（' + (state.adLanguage === 'zh' ? '中文' : '英文') + '）', draft.alt, { required: false, limit: 500 });
  const preview = node('div', 'ad-image-preview'); imageSection.append(preview);
  const previewImage = () => {
    preview.replaceChildren();
    if (!image.value.trim()) return;
    const picture = node('img'); picture.alt = '广告图片预览'; picture.src = adImageSource(image.value.trim());
    picture.addEventListener('error', () => { preview.replaceChildren(node('p', 'field-hint', '图片无法载入，请检查地址或重新上传。')); });
    preview.append(picture);
  };
  image.addEventListener('change', previewImage); previewImage();
  const bindImageUpload = (file, image, previewImage) => file.addEventListener('change', async () => {
    const selected = file.files[0]; if (!selected || state.busy) return;
    if (selected.size > 5 * 1024 * 1024) { uploadStatus.textContent = '图片不能超过 5 MB。'; file.value = ''; return; }
    setBusy(true); file.disabled = true; uploadStatus.textContent = '正在上传图片…';
    try {
      const bitmap = await createImageBitmap(selected); bitmap.close();
      const data = await new Promise((resolve, reject) => {
        const reader = new FileReader(); reader.onload = () => resolve(reader.result.split(',')[1]); reader.onerror = reject; reader.readAsDataURL(selected);
      });
      const result = await api('ad-upload', 'POST', { data });
      image.value = result.path; state.dirty = true; previewImage();
      uploadStatus.textContent = '图片已上传。保存并发布后将在前台展示。';
    } catch (error) { uploadStatus.textContent = error.message || '图片无法读取，请选择有效图片。'; }
    finally { file.value = ''; file.disabled = false; setBusy(false); }
  });
  bindImageUpload(file, image, previewImage);
  let mobileImage;
  if (position === 'top') {
    const mobile = section(imageSection, '手机版素材（可选）');
    mobile.append(node('p', 'field-hint', '屏幕宽度不超过 600 px 时展示手机版，按图片比例显示。未设置时沿用主图。'));
    mobileImage = field(mobile, '手机图片 HTTPS 地址或已上传图片路径', draft.mobileImage ?? '', { required: false, limit: 2048 });
    const mobileFile = field(mobile, '上传手机图片（最大 5 MB）', '', { type: 'file', required: false });
    mobileFile.accept = file.accept;
    const mobilePreview = node('div', 'ad-image-preview'); mobile.append(mobilePreview);
    const showMobile = () => {
      mobilePreview.replaceChildren();
      if (!mobileImage.value.trim()) return;
      const img = node('img'); img.alt = '手机广告图片预览'; img.src = adImageSource(mobileImage.value.trim());
      img.addEventListener('error', () => mobilePreview.replaceChildren(node('p', 'field-hint', '手机图片无法载入，请检查地址或重新上传。')));
      mobilePreview.append(img);
    };
    mobileImage.addEventListener('change', showMobile); showMobile();
    bindImageUpload(mobileFile, mobileImage, showMobile);
  }

  const codeSection = section(parent, '广告代码');
  const code = field(codeSection, 'HTML / JavaScript 广告代码', draft.code, { multiline: true, required: false, limit: 100000 });
  code.rows = 10; code.classList.add('ad-code-input'); code.spellcheck = false;
  codeSection.append(node('p', 'field-hint', '粘贴完整广告代码，外部资源请使用 HTTPS 地址。代码在独立广告框中运行，部分广告平台要求在页面主环境运行的代码可能不兼容，请先预览。'));
  const codePreview = node('div', 'ad-code-preview');
  const previewButton = action('预览代码效果', 'secondary', async () => {
    if (state.busy) return;
    setBusy(true); byId('editor-error').textContent = '';
    try {
      const result = await api('ad-preview', 'POST', { code: code.value });
      const frame = node('iframe'); frame.title = '广告代码预览'; frame.className = position === 'top' ? 'ad-preview-banner' : 'ad-preview-rail';
      frame.height = String(Number(height.value) || draft.height);
      frame.setAttribute('sandbox', 'allow-scripts allow-popups allow-popups-to-escape-sandbox'); frame.referrerPolicy = 'no-referrer'; frame.src = result.url;
      codePreview.replaceChildren(frame);
    } catch (error) { byId('editor-error').textContent = error.message; }
    finally { setBusy(false); }
  });
  codeSection.append(previewButton, codePreview);
  const updateType = () => {
    imageSection.hidden = type.value !== 'image'; codeSection.hidden = type.value !== 'code';
    for (const control of imageSection.querySelectorAll('input,textarea')) control.disabled = imageSection.hidden;
    code.disabled = codeSection.hidden; image.required = !imageSection.hidden; code.required = !codeSection.hidden;
    if (codeSection.hidden) codePreview.replaceChildren();
  };
  type.addEventListener('change', updateType); updateType();
  return () => ({ enabled: enabled.checked, type: type.value, expiresOn: expiry.value, height: Number(height.value), image: image.value.trim(), mobileImage: mobileImage?.value.trim() ?? draft.mobileImage ?? '', link: link.value.trim(), alt: alt.value.trim(), code: code.value });
}

function renderContactSettings() {
  const contact = state.data.contact;
  const list = byId('content-list');
  list.replaceChildren();
  const overview = node('div', 'contact-settings-summary');
  overview.append(node('span', 'eyebrow', 'CONTACT PAGE /'), node('h2', '', contact.title.zh), node('p', 'muted', contact.description.zh));
  const links = node('div', 'contact-settings-links');
  for (const [href, label] of [['../contact/', '查看中文联系页面 ↗'], ['../en/contact/', '查看英文联系页面 ↗']]) {
    const link = node('a', '', label);
    link.href = href; link.target = '_blank'; link.rel = 'noopener'; links.append(link);
  }
  overview.append(links);
  list.append(overview);
  byId('list-count').textContent = '联系页面文案 · 访客留言请到“提交信息”查看';
}

async function loadWorkspace() {
  state.data = await api('data');
  byId('current-user').textContent = state.session.username;
  byId('boot-message').hidden = true;
  byId('login-view').hidden = true;
  byId('workspace').hidden = false;
  render();
  if (state.view === 'submissions') await loadSubmissions();
}

function field(parent, label, value = '', { type = 'text', required = true, limit = 12000, multiline = false, readOnly = false } = {}) {
  const wrapper = node('label', '', label);
  const input = node(multiline ? 'textarea' : 'input');
  if (!multiline) input.type = type;
  input.value = value ?? '';
  input.required = required;
  input.maxLength = limit;
  input.readOnly = readOnly;
  if (multiline) input.rows = 3;
  wrapper.append(input);
  parent.append(wrapper);
  return input;
}

function select(parent, label, value, options) {
  const wrapper = node('label', '', label);
  const input = node('select');
  input.setAttribute('aria-label', label);
  for (const [optionValue, optionLabel] of options) {
    const option = node('option', '', optionLabel);
    option.value = optionValue;
    input.append(option);
  }
  input.value = value;
  wrapper.append(input);
  parent.append(wrapper);
  return input;
}

function copyFields(parent, label, value = blankCopy(), { required = true, limit = 12000, multiline = false } = {}) {
  const pair = node('div', 'copy-fields');
  const chinese = field(pair, label + '（中文）', value.zh, { required, limit, multiline });
  const english = field(pair, label + '（英文，可留空）', value.en, { required: false, limit, multiline });
  parent.append(pair);
  return () => ({ zh: chinese.value.trim(), en: english.value.trim() });
}

function section(parent, title) {
  const container = node('section', 'editor-section');
  container.append(node('h3', '', title));
  parent.append(container);
  return container;
}

function repeating(parent, label, entries, renderEntry, minimum = 0, maximum = 20) {
  const container = node('div');
  const rows = new Map();
  const add = action('＋ 添加' + label, 'add-button', () => { append(null); state.dirty = true; });
  const update = () => {
    let index = 0;
    for (const [card, entry] of rows) {
      entry.title.textContent = label + ' ' + (++index);
      entry.remove.disabled = rows.size <= minimum;
    }
    add.disabled = rows.size >= maximum;
  };
  const append = value => {
    if (rows.size >= maximum) return;
    const card = node('div', 'dynamic-card');
    const heading = node('div', 'dynamic-card-heading');
    const title = node('strong');
    const remove = action('移除' + label, 'remove-button', () => {
      if (rows.size <= minimum || state.busy) return;
      rows.delete(card);
      card.remove();
      state.dirty = true;
      update();
    });
    heading.append(title, remove);
    card.append(heading);
    const read = renderEntry(card, value);
    rows.set(card, { read, title, remove });
    container.append(card);
    update();
  };
  parent.append(container, add);
  for (const entry of entries) append(entry);
  while (rows.size < minimum) append(null);
  update();
  return () => [...rows.values()].map(entry => entry.read());
}

function copyList(parent, label, entries, minimum = 0, maximum = 20, limit = 2000) {
  return repeating(parent, label, entries, (card, value) => copyFields(card, label, value ?? blankCopy(), { multiline: true, limit }), minimum, maximum);
}

function providerEditor(parent, value) {
  const basic = section(parent, '01 / 基本信息');
  const grid = node('div', 'field-grid');
  const id = field(grid, 'URL 标识（小写字母、数字及连接符）', value.id, { limit: 64, readOnly: Boolean(state.editing.originalId) });
  const name = field(grid, '商家名称', value.name, { limit: 100 });
  const mark = field(grid, '商家缩写', value.mark, { required: false, limit: 12 });
  const verified = field(grid, '资料查阅日期', value.verified, { type: 'date' });
  const officialUrl = field(grid, '官方网站（HTTPS）', value.officialUrl, { type: 'url', limit: 2048 });
  const logo = field(grid, 'Logo 图片地址或本地路径', value.logo, { required: false, limit: 2048 });
  const sourceUrl = field(grid, '资料来源网址（可留空）', value.sourceUrl, { type: 'url', required: false, limit: 2048 });
  const tone = select(grid, '标识色系', value.tone, [['green', '绿色'], ['orange', '橙色'], ['blue', '蓝色'], ['red', '红色'], ['purple', '紫色'], ['cyan', '青色'], ['yellow', '黄色']]);
  basic.append(grid);
  const categories = node('fieldset', 'category-fieldset');
  categories.append(node('legend', '', '选型分类（至少选择一项）'));
  const checks = node('div', 'checkbox-group');
  for (const [key, label] of Object.entries(categoryLabels)) {
    const wrapper = node('label', '', label);
    const checkbox = node('input');
    checkbox.type = 'checkbox';
    checkbox.value = key;
    checkbox.checked = value.categories.includes(key);
    wrapper.prepend(checkbox);
    checks.append(wrapper);
  }
  categories.append(checks);
  basic.append(categories);
  const darkLabel = node('label', 'checkbox-group', 'Logo 使用深色背景');
  const logoDark = node('input');
  logoDark.type = 'checkbox';
  logoDark.checked = Boolean(value.logoDark);
  darkLabel.prepend(logoDark);
  basic.append(darkLabel);
  const copy = section(parent, '02 / 目录文案');
  const sourceLabel = copyFields(copy, '资料来源名称', value.sourceLabel, { limit: 200 });
  const tagline = copyFields(copy, '商家定位', value.tagline, { limit: 500 });
  const intro = copyFields(copy, '商家介绍', value.intro, { multiline: true });
  const bestFor = copyFields(copy, '适用场景', value.bestFor, { multiline: true, limit: 2000 });
  const watchouts = copyFields(copy, '注意事项', value.watchouts, { multiline: true, limit: 6000 });
  const highlights = copyList(section(parent, '03 / 产品亮点'), '产品亮点', value.highlights, 1);
  const compare = section(parent, '04 / 并排对比资料');
  const comparisonReaders = {};
  for (const [key, label] of Object.entries({ delivery: '交付定位', security: '安全方向', edge: '边缘能力', origin: '接入与源站', fit: '选型方向' })) comparisonReaders[key] = copyFields(compare, label, value.compare[key], { limit: 2000 });
  let readSeo;
  if (value.seo) {
    const seo = section(parent, '05 / 独立详情页');
    const title = copyFields(seo, '详情页标题', value.seo.title, { limit: 300 });
    const description = copyFields(seo, '详情页描述', value.seo.description, { multiline: true, limit: 2000 });
    const analysis = copyFields(seo, '编辑解读', value.seo.analysis, { multiline: true });
    const questions = copyList(seo, '选型问题', value.seo.questions, 1);
    readSeo = () => ({ title: title(), description: description(), analysis: analysis(), questions: questions() });
  }
  return () => {
    const result = {
      id: id.value.trim(), name: name.value.trim(), mark: mark.value.trim() || name.value.trim().slice(0, 4),
      verified: verified.value, officialUrl: officialUrl.value.trim(), logo: logo.value.trim(), tone: tone.value, logoDark: logoDark.checked,
      categories: [...checks.querySelectorAll('input:checked')].map(input => input.value),
      sourceLabel: sourceLabel(), tagline: tagline(), intro: intro(), bestFor: bestFor(), watchouts: watchouts(), highlights: highlights(),
      compare: Object.fromEntries(Object.entries(comparisonReaders).map(([key, read]) => [key, read()])),
    };
    if (sourceUrl.value.trim()) result.sourceUrl = sourceUrl.value.trim();
    if (readSeo) result.seo = readSeo();
    return result;
  };
}

function articleEditor(parent, value) {
  const basic = section(parent, '01 / 文章信息');
  const grid = node('div', 'field-grid');
  const id = field(grid, 'URL 标识（小写字母、数字及连接符）', value.id, { limit: 64, readOnly: Boolean(state.editing.originalId) });
  const date = field(grid, '文章日期', value.date, { type: 'date' });
  const modified = field(grid, '最近实质更新日期（可留空）', value.modified ?? '', { type: 'date' });
  const readTime = field(grid, '预计阅读分钟数', value.readTime, { type: 'number' });
  readTime.min = 1;
  readTime.max = 180;
  readTime.step = 1;
  const status = select(grid, '前台可见性', value.status, [['draft', '私有草稿'], ['published', '发布后公开']]);
  basic.append(grid);
  const title = copyFields(basic, '文章标题', value.title, { limit: 500 });
  const category = copyFields(basic, '文章分类', value.category, { limit: 100 });
  const excerpt = copyFields(basic, '文章摘要', value.excerpt, { multiline: true, limit: 4000 });
  const body = section(parent, '02 / 正文（章节与段落）');
  body.append(node('p', 'field-hint', '正文支持链接：[高防CDN](https://www.cdn5.com/)；站内链接示例：[选型指南](article/cdn-selection-framework/)。HTML 仍按纯文本显示。'));
  const chapters = repeating(body, '章节', value.sections, (card, entry) => {
    const heading = copyFields(card, '章节标题', entry?.heading ?? blankCopy(), { limit: 500 });
    const paragraphs = copyList(card, '正文段落', entry?.paragraphs ?? [blankCopy()], 0, 100, 20000);
    const bullets = copyList(card, '列表项', entry?.bullets ?? [], 0, 100, 6000);
    let readTable;
    if (entry?.table) {
      const caption = copyFields(card, '对照表说明', entry.table.caption, {limit:1000});
      const columns = copyList(card, '表格列标题', entry.table.columns, 2, 6, 300);
      const rows = repeating(card, '表格行', entry.table.rows, (rowCard, row) => copyList(rowCard, '单元格', row, 2, 6, 3000), 1, 30);
      readTable = () => ({caption:caption(),columns:columns(),rows:rows()});
    }
    const figures = repeating(card, '技术图解', entry?.figures ?? [], (figureCard, figure) => {
      const src = field(figureCard, '本站图片路径', figure?.src ?? '', {limit:2048});
      const alt = copyFields(figureCard, '图片替代文本', figure?.alt ?? blankCopy(), {limit:500});
      const caption = copyFields(figureCard, '图片说明', figure?.caption ?? blankCopy(), {limit:2000,multiline:true});
      const credit = copyFields(figureCard, '图片来源说明', figure?.credit ?? blankCopy(), {limit:500});
      return () => ({src:src.value.trim(),alt:alt(),caption:caption(),credit:credit()});
    },0,4);
    return () => ({heading:heading(),paragraphs:paragraphs(),bullets:bullets(),...(readTable?{table:readTable()}:{}),...(figures().length?{figures:figures()}:{})});
  }, 1, 100);
  const sources = repeating(section(parent, '03 / 参考资料'), '参考资料', value.sources, (card, entry) => {
    const label = copyFields(card, '资料名称', entry?.label ?? blankCopy(), { limit: 300 });
    const url = field(card, '资料网址（HTTPS）', entry?.url ?? '', { type: 'url', limit: 2048 });
    return () => ({ label: label(), url: url.value.trim() });
  }, 0, 50);
  return () => ({id:id.value.trim(),date:date.value,...(value.seriesOrder?{seriesOrder:value.seriesOrder}:{}),...(modified.value?{modified:modified.value}:{}),readTime:Number(readTime.value),status:status.value,title:title(),category:category(),excerpt:excerpt(),sections:chapters(),sources:sources()});
}

function emptyItem() {
  if (state.view === 'articles') return { id: '', status: 'draft', date: today(), readTime: 3, title: blankCopy(), category: blankCopy(), excerpt: blankCopy(), sections: [{ heading: blankCopy(), paragraphs: [blankCopy()], bullets: [] }], sources: [] };
  return { id: '', name: '', mark: '', tone: 'green', verified: today(), officialUrl: '', logo: 'favicon.svg', logoDark: false, categories: ['delivery'], sourceLabel: blankCopy(), tagline: blankCopy(), intro: blankCopy(), bestFor: blankCopy(), watchouts: blankCopy(), highlights: [blankCopy()], compare: Object.fromEntries(['delivery', 'security', 'edge', 'origin', 'fit'].map(key => [key, blankCopy()])) };
}

function contactEditor(parent, value) {
  const basic = section(parent, '01 / 独立页面文案');
  const title = copyFields(basic, '页面标题', value.title, { limit: 300 });
  const description = copyFields(basic, '页面简介', value.description, { limit: 2000, multiline: true });
  return () => ({ title: title(), description: description(), channels: value.channels });
}

function openEditor(item) {
  if (state.busy) return;
  state.editing = { kind: state.view, originalId: item?.id ?? null, read: null };
  state.dirty = false;
  const target = byId('editor-fields');
  target.replaceChildren();
  byId('editor-error').textContent = '';
  byId('editor-note').textContent = state.view === 'advertising' ? '此配置仅用于' + (state.adLanguage === 'zh' ? '中文页面' : '英文页面') + '。保存后点击“发布到前台”生效，素材、链接、启停和到期日期分别管理。' : '中文为必填；英文未填写时沿用中文。文字以纯文本发布，不执行 HTML。';
  if (state.view === 'advertising') {
    const position = item?.id ?? 'top';
    state.editing.originalId = position;
    state.editing.language = state.adLanguage;
    byId('editor-title').textContent = '编辑' + adLanguageLabels[state.adLanguage] + ' · ' + adLabels[position];
    state.editing.read = advertisingEditor(target, structuredClone(state.data.advertising[state.adLanguage][position]), position);
    byId('editor').showModal();
    return;
  }
  const contactView = state.view === 'contact';
  byId('editor-title').textContent = contactView ? '编辑联系我们页面' : item ? '编辑' + (state.view === 'providers' ? '商家 · ' + item.name : '文章') : state.view === 'providers' ? '新增商家' : '撰写文章';
  const draft = structuredClone(contactView ? state.data.contact : item ?? emptyItem());
  state.editing.read = contactView ? contactEditor(target, draft) : state.view === 'providers' ? providerEditor(target, draft) : articleEditor(target, draft);
  byId('editor').showModal();
}

function closeEditor(force = false) {
  if (!force && (state.busy || state.dirty && !confirm('编辑内容尚未保存，确定放弃这些更改吗？'))) return;
  state.dirty = false;
  state.editing = null;
  byId('editor').close();
  byId('editor-fields').replaceChildren();
}

async function saveItem(event) {
  event.preventDefault();
  if (state.busy || !state.editing || !state.data) return;
  const item = state.editing.read();
  const next = structuredClone(state.data);
  if (state.editing.kind === 'contact') next.contact = item;
  else if (state.editing.kind === 'advertising') next.advertising[state.editing.language][state.editing.originalId] = item;
  else {
  const list = next[state.editing.kind];
  const index = list.findIndex(candidate => candidate.id === state.editing.originalId);
  if (list.some((candidate, candidateIndex) => candidate.id === item.id && candidateIndex !== index)) {
    byId('editor-error').textContent = '该 URL 标识已存在，请使用另一个标识。';
    return;
  }
  if (index < 0) list.push(item);
  else list[index] = item;
  }
  setBusy(true);
  byId('editor-error').textContent = '';
  try {
    state.data = await api('data', 'PUT', next);
    closeEditor(true);
    render();
    notice('已保存到后台。点击“发布到前台”后，公开内容才会同步到网站。');
  } catch (error) {
    byId('editor-error').textContent = error.message + (error.status === 409 ? '\n请先取消编辑并重新载入页面，不会覆盖其他管理页面的更改。' : '');
  } finally { setBusy(false); }
}

async function deleteItem(item) {
  if (state.busy || !confirm('确定从后台删除“' + (item.name ?? item.title.zh) + '”吗？发布后也会移除对应的前台页面。')) return;
  const next = structuredClone(state.data);
  next[state.view] = next[state.view].filter(candidate => candidate.id !== item.id);
  setBusy(true);
  try {
    state.data = await api('data', 'PUT', next);
    render();
    notice('删除已保存。点击“发布到前台”后才会移除公开页面。');
  } catch (error) { notice(error.message, true); }
  finally { setBusy(false); }
}

byId('login-form').addEventListener('submit', async event => {
  event.preventDefault();
  if (state.busy) return;
  const credentials = { username: byId('login-username').value.trim(), password: byId('login-password').value };
  setBusy(true);
  byId('login-error').textContent = '';
  try {
    state.session = await api('login', 'POST', credentials);
    byId('login-password').value = '';
    await loadWorkspace();
  } catch (error) { showLogin(error.message); }
  finally { setBusy(false); }
});
byId('logout').addEventListener('click', async () => {
  if (state.busy) return;
  setBusy(true);
  try { await api('logout', 'POST', {}); showLogin('已安全退出。'); }
  catch (error) { notice(error.message, true); }
  finally { setBusy(false); }
});
for (const button of document.querySelectorAll('[data-view]')) button.addEventListener('click', () => {
  if (state.busy) return;
  state.view = button.dataset.view;
  clearTimeout(submissionSearchTimer);
  byId('content-search').value = '';
  notice('');
  render();
  if (state.view === 'submissions') loadSubmissions();
});
byId('content-search').addEventListener('input', () => {
  if (state.view !== 'submissions') { render(); return; }
  clearTimeout(submissionSearchTimer);
  submissionSearchTimer = setTimeout(() => loadSubmissions(), 250);
});
byId('add-item').addEventListener('click', () => state.view === 'submissions' ? loadSubmissions(submissions?.page ?? 1) : openEditor());
byId('editor-form').addEventListener('submit', saveItem);
byId('editor-fields').addEventListener('input', () => { state.dirty = true; });
byId('editor-fields').addEventListener('change', () => { state.dirty = true; });
byId('close-editor').addEventListener('click', () => closeEditor());
byId('cancel-editor').addEventListener('click', () => closeEditor());
byId('editor').addEventListener('cancel', event => { event.preventDefault(); closeEditor(); });
byId('publish').addEventListener('click', async () => {
  if (state.busy || !state.data) return;
  setBusy(true);
  byId('publish').textContent = '正在发布…';
  notice('正在生成中文、英文及独立内容页面，请稍候。');
  try {
    state.data = await api('publish', 'POST', { revision: state.data.revision });
    render();
    notice('发布成功。公开页面已更新；私有草稿未对读者公开。');
  } catch (error) { notice(error.message, true); }
  finally { byId('publish').textContent = '发布到前台 ↗'; setBusy(false); }
});
window.addEventListener('beforeunload', event => {
  if (state.dirty) { event.preventDefault(); event.returnValue = ''; }
});

async function boot() {
  try {
    const session = await api('session');
    if (session.authenticated) { state.session = session; await loadWorkspace(); }
    else {
      showLogin(session.configured ? '' : '管理员账号尚未配置，请先在服务器创建管理员凭据。');
      byId('login-submit').disabled = !session.configured;
    }
  } catch (error) { showLogin(error.message); }
}
boot();
