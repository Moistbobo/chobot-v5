import envConfig from 'config/envConfig';
import action from './action';

const Deathmatch: Command = {
  action,
  name: 'Deathmatch',
  triggers: ['deathmatch'],
  description: 'Start a deathmatch with another user. Does not work on self.',
  exampleUsage: `${envConfig.BOT_PREFIX}deathmatch [username]`,
};

export default Deathmatch;
