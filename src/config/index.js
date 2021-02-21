import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const {
  YOUTUBE_API_KEYS: youtube_api_key = '',
  CLIENT_ID: client_id = '',
  CLIENT_SECRET: client_secret = '',
  COOKIE_KEY: cookie_key = '',
  PORT: port = 3000,
  DOMAIN: domain = 'http://localhost',
} = process.env;

export default {
  domain,
  port: parseInt(port, 10),
  base: `${domain}:${port}`,
  __dirname: dirname(fileURLToPath(import.meta.url)).replace(
    'src\\config',
    'src'
  ),
  youtube_api_key,
  client_id,
  client_secret,
  cookie_key,
};
