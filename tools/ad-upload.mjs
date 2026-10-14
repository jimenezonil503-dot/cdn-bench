import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { AdminError } from './admin-content.mjs';

export const MAX_AD_IMAGE_BYTES = 5 * 1024 * 1024;
export const AD_IMAGE_NAME = /^[a-f0-9]{64}\.(png|jpg|gif|webp)$/;
export const AD_IMAGE_TYPES = { png: 'image/png', jpg: 'image/jpeg', gif: 'image/gif', webp: 'image/webp' };

export function decodeAdImage(data) {
  if (typeof data !== 'string' || !data.length || data.length > Math.ceil(MAX_AD_IMAGE_BYTES / 3) * 4) throw new AdminError(413, '广告图片不能超过 5 MB。');
  if (data.length % 4 || /[^A-Za-z0-9+/=]/.test(data)) throw new AdminError(400, '图片数据格式无效。');
  const bytes = Buffer.from(data, 'base64');
  if (bytes.toString('base64') !== data) throw new AdminError(400, '图片数据格式无效。');
  if (bytes.length > MAX_AD_IMAGE_BYTES) throw new AdminError(413, '广告图片不能超过 5 MB。');
  let extension;
  if (bytes.length >= 45 && bytes.subarray(0, 8).equals(Buffer.from('89504e470d0a1a0a', 'hex')) && bytes.toString('ascii', 12, 16) === 'IHDR' && bytes.toString('ascii', bytes.length - 8, bytes.length - 4) === 'IEND') extension = 'png';
  else if (bytes.length >= 32 && bytes[0] === 255 && bytes[1] === 216 && bytes[bytes.length - 2] === 255 && bytes[bytes.length - 1] === 217) extension = 'jpg';
  else if (bytes.length >= 14 && /^GIF8[79]a$/.test(bytes.toString('ascii', 0, 6)) && bytes[bytes.length - 1] === 59) extension = 'gif';
  else if (bytes.length >= 20 && bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP' && bytes.readUInt32LE(4) === bytes.length - 8) extension = 'webp';
  if (!extension) throw new AdminError(400, '请上传有效的 PNG、JPG、GIF 或 WebP 图片，不支持 SVG 或 HTML 文件。');
  return { bytes, extension };
}

export async function uploadAdImage(rootDirectory, data) {
  const { bytes, extension } = decodeAdImage(data);
  const name = createHash('sha256').update(bytes).digest('hex') + '.' + extension;
  const directory = resolve(rootDirectory, 'assets/ads');
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, name), bytes);
  return { path: 'assets/ads/' + name };
}

export async function readAdImage(rootDirectory, name) {
  if (!AD_IMAGE_NAME.test(name)) throw new AdminError(404, '广告图片不存在。');
  try { return { bytes: await readFile(resolve(rootDirectory, 'assets/ads', name)), type: AD_IMAGE_TYPES[name.split('.').pop()] }; }
  catch (error) { if (error.code === 'ENOENT') throw new AdminError(404, '广告图片不存在。'); throw error; }
}
