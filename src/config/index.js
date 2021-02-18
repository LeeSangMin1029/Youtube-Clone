import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  __dirname: dirname(fileURLToPath(import.meta.url)).replace(
    'src\\config',
    'src'
  ),
  youtube_api_key: process.env.YOUTUBE_API_KEYS,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  cookie_key: process.env.COOKIE_KEY,
};
