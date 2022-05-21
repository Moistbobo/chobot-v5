import envConfig from 'config/envConfig';
import action from './action';

const Racist: Command = {
  action,
  name: 'Racist',
  description: 'Check how racist a user is.',
  triggers: ['racist'],
  exampleUsage: `${envConfig.BOT_PREFIX}racist [username]\n${envConfig.BOT_PREFIX}racist moistbobo\n${envConfig.BOT_PREFIX}racist`,
};

export default Racist;
