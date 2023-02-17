import 'dotenv/config';

const envConfig = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_PREFIX: process.env.BOT_PREFIX || '.',
  NADEKO_DB_PATH: process.env.NADEKO_DB_PATH || '',
  MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI || '',
};

export default envConfig;
