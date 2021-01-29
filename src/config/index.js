import dotenv from 'dotenv';
import { dirname } from 'path';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  __dirname: dirname(new URL(import.meta.url).pathname).substr(1, 29),
};
