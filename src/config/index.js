import dotenv from 'dotenv';
import { dirname } from 'path';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  __dirname: dirname(new URL(import.meta.url).pathname).substr(1, 29),
  youtube_api_key: process.env.YOUTUBE_API_KEYS,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
};
