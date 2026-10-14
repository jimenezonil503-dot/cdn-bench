const form = document.querySelector('.contact-submission-form');
if (form) {
  const english = form.dataset.language === 'en';
  const response = form.querySelector('.submission-response');
  const button = form.querySelector('button[type="submit"]');
  const labels = english
    ? { submit: 'Send message', sending: 'Sending…', successTitle: 'Message sent', sent: 'Thanks — your message has been received.', confirm: 'Done', retry: 'We could not send that just now. Please try again.', rate: 'Too many attempts. Please wait a few minutes and try again.', required: 'Please complete all three fields.' }
    : { submit: '提交', sending: '正在提交…', successTitle: '提交成功', sent: '提交成功，我们已收到你的信息。', confirm: '好的', retry: '暂时无法提交，请稍后再试。', rate: '提交次数过多，请稍等几分钟后再试。', required: '请完整填写标题、内容和联系方式。' };
  const successDialog = document.createElement('dialog');
  successDialog.className = 'submission-dialog';
  successDialog.setAttribute('aria-labelledby', 'submission-success-title');
  successDialog.setAttribute('aria-describedby', 'submission-success-description');
  successDialog.innerHTML = `<span class="submission-dialog-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 4 4L19 6"/></svg></span><h2 id="submission-success-title">${labels.successTitle}</h2><p id="submission-success-description">${labels.sent}</p><button class="submission-dialog-confirm" type="button" autofocus>${labels.confirm}</button>`;
  document.body.append(successDialog);
  successDialog.querySelector('button').addEventListener('click', () => successDialog.close());
  successDialog.addEventListener('close', () => button.focus({ preventScroll: true }));
  let requestId;
  let lastBody;
  button.disabled = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (button.disabled) return;
    if (!form.reportValidity()) { response.textContent = labels.required; return; }
    const values = Object.fromEntries(new FormData(form));
    for (const input of form.querySelectorAll('[name]')) {
      if (!values[input.name].trim()) { response.textContent = labels.required; input.focus(); return; }
    }
    const body = JSON.stringify(values);
    if (body !== lastBody) { requestId = crypto.randomUUID(); lastBody = body; }
    button.disabled = true;
    button.textContent = labels.sending;
    form.setAttribute('aria-busy', 'true');
    response.classList.remove('submission-error', 'submission-success');
    response.textContent = '';
    try {
      const result = await fetch(new URL(form.dataset.api, document.baseURI), {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'omit', cache: 'no-store',
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ ...values, language: form.dataset.language, requestId }),
      });
      const payload = await result.json().catch(() => ({}));
      if (!result.ok || payload.ok !== true) { response.textContent = payload.error === 'rate_limit' ? labels.rate : labels.retry; response.classList.add('submission-error'); return; }
      form.reset();
      lastBody = null;
      successDialog.showModal();
    } catch (error) {
      response.textContent = labels.retry;
      response.classList.add('submission-error');
    } finally {
      button.disabled = false;
      form.setAttribute('aria-busy', 'false');
      button.textContent = labels.submit;
      const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden', 'true'); arrow.textContent = '↗'; button.append(arrow);
    }
  });
}
