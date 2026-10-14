import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ContactSubmissionStore, validateSubmission } from '../tools/contact-submissions.mjs';
import { createPreviewServer } from '../tools/serve.mjs';
import { createCredentials } from '../tools/admin-auth.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const workRoot = fileURLToPath(new URL('../../../work/submission-checks/', import.meta.url));
const message = (changes = {}) => ({ title: '合作咨询', content: '希望了解广告合作。\n请联系我。', contact: 'test@example.com', language: 'zh', requestId: randomUUID(), ...changes });
async function fixture(context) {
  await mkdir(workRoot, { recursive: true });
  const directory = await mkdtemp(resolve(workRoot, 'fixture-'));
  context.after(async () => { assert.equal(dirname(directory), resolve(workRoot)); await rm(directory, { recursive: true, force: true }); });
  return directory;
}

test('submissions require three bounded fields, a supported language and a valid retry identifier', () => {
  assert.equal(validateSubmission(message({ title: '  合作咨询  ' })).title, '合作咨询');
  for (const changes of [{ title: '   ' }, { content: '' }, { contact: [] }, { title: 'x'.repeat(121) }, { content: 'x'.repeat(6001) }, { contact: 'x'.repeat(241) }, { content: 'test\0' }, { language: 'fr' }, { requestId: '../../secret' }]) {
    assert.throws(() => validateSubmission(message(changes)), { status: 400 });
  }
  for (const value of [null, [], 'text']) assert.throws(() => validateSubmission(value), { status: 400 });
});

test('concurrent submissions survive restart, retain multiline text, deduplicate retries and paginate newest first', async context => {
  const directory = await fixture(context);
  const store = new ContactSubmissionStore(directory);
  const request = message({ content: '<script>window.attack=true</script>\nsecond line' });
  const results = await Promise.all([store.add(request), store.add(request), store.add(request)]);
  assert.equal(new Set(results.map(row => row.id)).size, 1);
  assert.equal(results.filter(row => !row.duplicate).length, 1);
  await assert.rejects(store.add({ ...request, title: 'changed request' }), { status: 409 });
  await Promise.all(Array.from({ length: 25 }, (_, index) => store.add(message({ title: 'Message ' + index, language: 'en' }))));
  const restored = new ContactSubmissionStore(directory);
  const first = await restored.list();
  assert.equal(first.total, 26); assert.equal(first.items.length, 20); assert.equal(first.pages, 2);
  assert.equal(first.items[0].title, 'Message 24');
  assert.ok(first.items.every(row => !Object.hasOwn(row, 'requestId')));
  const second = await restored.list({ page: 2 }); assert.equal(second.items.length, 6);
  assert.equal(second.items.at(-1).content, request.content);
  const searched = await restored.list({ query: 'second LINE' });
  assert.equal(searched.total, 1); assert.equal(searched.items[0].contact, request.contact);
  assert.equal((await restored.list({ page: 999 })).page, 2);
  assert.equal((await restored.list({ page: -1 })).page, 1);
  assert.equal((await restored.list({ query: 'no matches' })).total, 0);
});

test('public submissions persist privately and only authenticated administrators can list them', async context => {
  const directory = await fixture(context);
  for (const path of ['admin', 'tools', 'content.js', 'editorial', 'seo-content.js', 'platform.js', 'article-links.js', 'benchmark.js', 'i18n.js']) await cp(resolve(root, path), resolve(directory, path), { recursive: true });
  const credentials = await createCredentials('message-admin', 'messages-test-password');
  let server;
  const start = async () => {
    server = createPreviewServer({ rootDirectory: directory, adminCredentials: credentials });
    await new Promise(done => server.listen(0, '127.0.0.1', done));
    return 'http://127.0.0.1:' + server.address().port;
  };
  let origin = await start();
  context.after(() => new Promise(done => server.close(done)));
  const post = (value, headers = {}) => fetch(origin + '/api/contact', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(value) });
  assert.equal((await fetch(origin + '/api/contact')).status, 405);
  assert.equal((await post(message(), { Origin: 'https://evil.example' })).status, 403);
  const request = message({ title: 'PRIVATE-TITLE', contact: 'PRIVATE-EMAIL@example.com' });
  const accepted = await post(request); assert.equal(accepted.status, 201); assert.deepEqual(await accepted.json(), { ok: true });
  assert.equal((await post(request)).status, 200);
  assert.equal((await post(message({ language: 'en', title: 'English message' }))).status, 201);
  assert.equal((await post(message({ title: '' }))).status, 400);
  assert.equal((await post(message({ content: 'x'.repeat(40000) }))).status, 413);
  assert.equal((await post(message())).status, 429);
  for (const route of ['/admin/api/submissions', '/.admin/submissions.json', '/tools/contact-submissions.mjs', '/api/contact/messages']) {
    const response = await fetch(origin + route);
    assert.ok([401, 404].includes(response.status), route);
    assert.doesNotMatch(await response.text(), /PRIVATE-TITLE|PRIVATE-EMAIL/);
  }
  const login = await fetch(origin + '/admin/api/login', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ username: 'message-admin', password: 'messages-test-password' }) });
  assert.equal(login.status, 200);
  const cookie = login.headers.get('set-cookie').split(';')[0];
  const listing = await fetch(origin + '/admin/api/submissions', { headers: { Cookie: cookie } });
  assert.equal(listing.status, 200); assert.match(listing.headers.get('cache-control'), /no-store/);
  const data = await listing.json(); assert.equal(data.total, 2); assert.equal(data.items[0].language, 'en');
  const filtered = await (await fetch(origin + '/admin/api/submissions?q=PRIVATE-EMAIL', { headers: { Cookie: cookie } })).json(); assert.equal(filtered.total, 1);
  assert.doesNotMatch(await readFile(resolve(directory, 'admin/admin.js'), 'utf8'), /PRIVATE-TITLE|PRIVATE-EMAIL/);
  await new Promise(done => server.close(done));
  origin = await start();
  assert.equal((await fetch(origin + '/admin/api/submissions', { headers: { Cookie: cookie } })).status, 401);
  assert.equal((await new ContactSubmissionStore(directory).list()).total, 2);
});
