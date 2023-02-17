import 'dotenv/config';

const envConfig = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_PREFIX: process.env.BOT_PREFIX || '.',
  NADEKO_DB_PATH: process.env.NADEKO_DB_PATH || '',
  MONGO_DB_USERNAME: process.env.MONGO_DB_USERNAME || '',
  MONGO_DB_PASSWORD: process.env.MONGO_DB_PASSWORD || '',
};

export default envConfig;
