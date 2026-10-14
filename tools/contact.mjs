const escape = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');

export const DEFAULT_CONTACT = {
  title: { zh: '联系我们', en: 'Contact us' },
  description: { zh: '有问题或合作意向？留下信息，我们会与你联系。', en: 'Have a question or a project in mind? Leave a message and we will get in touch.' },
  channels: [],
};

export const CONTACT_TYPES = {
  email: { zh: '电子邮箱', en: 'Email', icon: 'M3 5h18v14H3z M3 5l9 7 9-7' },
  wechat: { zh: '微信', en: 'WeChat', icon: 'M20 11a8 8 0 0 1-8 8H7l-4 3 1-6a8 8 0 1 1 16-5Z M8 10h.01 M15 10h.01' },
  telegram: { zh: 'Telegram', en: 'Telegram', icon: 'm3 11 18-8-4 18-5-6-4 3 1-7 9-5-7 8Z' },
  phone: { zh: '电话', en: 'Phone', icon: 'M5 3h4l2 5-3 2c1 3 3 5 6 6l2-3 5 2v4c-9 3-19-7-16-16Z' },
  qq: { zh: 'QQ', en: 'QQ', icon: 'M5 9a7 7 0 0 1 14 0v5l2 4h-3l-2 3H8l-2-3H3l2-4Z M9 8h.01 M15 8h.01' },
  link: { zh: '其他渠道', en: 'More ways to connect', icon: 'M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2 M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2' },
};

export function contactHref(channel) {
  if (channel.type === 'email') return `mailto:${encodeURIComponent(channel.value).replace('%40', '@')}`;
  if (channel.type === 'phone') return `tel:${channel.value.replace(/[\s()-]/g, '')}`;
  if (channel.type === 'telegram') return channel.value.startsWith('https://') ? channel.value : `https://t.me/${channel.value.replace(/^@/, '')}`;
  if (channel.type === 'link') return channel.value;
  return '';
}

export function renderContact(settings, language = 'zh', rootPrefix = '../') {
  const contact = settings ?? DEFAULT_CONTACT;
  const english = language === 'en';
  const local = value => value?.[language] || value?.zh || '';
  const text = english ? {
    eyebrow: 'CONTACT / LET’S CONNECT', title: 'What would you like to talk about?',
    fields: ['Subject', 'Message', 'How can we reach you?'],
    placeholders: ['A few words about your message', 'Tell us a little more…', 'Email, phone, Telegram, or another contact'],

  } : {
    eyebrow: 'CONTACT / 联系我们', title: '有什么想和我们交流？',
    fields: ['标题', '内容', '联系方式'],
    placeholders: ['简单概括你想咨询的事', '请填写你希望沟通的内容…', '邮箱、电话、微信或其他联系方式'],

  };
  const field = (index, tag) => {
    const attributes = `name="${['title', 'content', 'contact'][index]}" placeholder="${text.placeholders[index]}" maxlength="${[120, 6000, 240][index]}"${tag === 'textarea' ? ' rows="7"' : ' autocomplete="off"'} required`;
    return `<label class="submission-field"><span>${text.fields[index]}</span>${tag === 'textarea' ? `<textarea ${attributes}></textarea>` : `<input ${attributes}>`}</label>`;
  };
  return `<section id="contact" class="contact-page-content" aria-labelledby="contact-title"><div class="submission-layout"><header class="submission-intro"><p class="contact-eyebrow">${text.eyebrow}</p><h1 id="contact-title">${escape(local(contact.title) || text.title)}</h1><p class="contact-lede">${escape(local(contact.description))}</p></header><form class="contact-submission-form" action="${escape(rootPrefix)}api/contact" method="post" data-api="${escape(rootPrefix)}api/contact" data-language="${english ? 'en' : 'zh'}" novalidate>${field(0, 'input')}${field(1, 'textarea')}${field(2, 'input')}<div class="submission-form-footer"><p class="submission-response" role="status" aria-live="polite"></p><button class="submission-submit" type="submit" disabled>${english ? 'Send message' : '提交'}<span aria-hidden="true">↗</span></button></div><noscript><p>${english ? 'Please enable JavaScript to send your message.' : '请启用 JavaScript 后提交信息。'}</p></noscript></form></div></section>`;
}
