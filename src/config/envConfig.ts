import 'dotenv/config';

const envConfig = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  BOT_PREFIX: process.env.BOT_PREFIX || '.',
};

export default envConfig;
