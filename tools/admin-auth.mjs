import { randomBytes, scrypt as deriveKey, timingSafeEqual, createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { promisify } from 'node:util';

const scrypt = promisify(deriveKey);

export async function createCredentials(username, password) {
  if (typeof username !== 'string' || !/^[a-zA-Z0-9@._-]{1,80}$/.test(username)) throw new Error('管理员账号格式无效。');
  if (typeof password !== 'string' || password.length < 12 || password.length > 256) throw new Error('管理员密码须为 12–256 个字符。');
  const salt = randomBytes(32).toString('hex');
  const hash = (await scrypt(password, salt, 64)).toString('hex');
  return { username, salt, hash };
}

export async function loadCredentials(rootDirectory) {
  if (process.env.ADMIN_USERNAME || process.env.ADMIN_PASSWORD) {
    return createCredentials(process.env.ADMIN_USERNAME ?? 'admin', process.env.ADMIN_PASSWORD);
  }
  try {
    const credentials = JSON.parse(await readFile(resolve(rootDirectory, '.admin/credentials.json'), 'utf8'));
    if (!/^[a-zA-Z0-9@._-]{1,80}$/.test(credentials.username) || !/^[a-f0-9]{64}$/.test(credentials.salt) || !/^[a-f0-9]{128}$/.test(credentials.hash)) throw new Error('管理员凭据文件无效。');
    return credentials;
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export async function verifyCredentials(credentials, username, password) {
  if (!credentials || typeof username !== 'string' || typeof password !== 'string' || password.length > 256) return false;
  const actual = await scrypt(password, credentials.salt, 64);
  const userDigest = value => createHash('sha256').update(value).digest();
  const validUser = timingSafeEqual(userDigest(username), userDigest(credentials.username));
  const validPassword = timingSafeEqual(actual, Buffer.from(credentials.hash, 'hex'));
  return validUser && validPassword;
}
