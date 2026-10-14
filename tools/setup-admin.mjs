import { mkdir, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { createCredentials } from './admin-auth.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const username = process.env.ADMIN_USERNAME ?? 'admin';
const password = process.env.ADMIN_PASSWORD ?? randomBytes(18).toString('base64url');
const credentials = await createCredentials(username, password);
await mkdir(resolve(root, '.admin'), { recursive: true });
try {
  await writeFile(resolve(root, '.admin/credentials.json'), `${JSON.stringify(credentials, null, 2)}\n`, { encoding: 'utf8', mode: 0o600, flag: 'wx' });
  console.log(`管理员账号已创建：${username}`);
  if (!process.env.ADMIN_PASSWORD) console.log(`初始密码（仅显示这一次，请妥善保存）：${password}`);
  console.log('后台入口：http://127.0.0.1:4317/admin/');
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.error('管理员账号已存在，没有覆盖。可通过 ADMIN_USERNAME / ADMIN_PASSWORD 环境变量更换登录凭据。');
  process.exitCode = 1;
}
