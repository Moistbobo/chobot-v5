import envConfig from 'config/envConfig';
import action from './action';

const Rep: Command = {
  action,
  name: 'Reputation',
  triggers: ['rep'],
  description: "Check a user's reputation. Defaults to sender.",
  exampleUsage: `${envConfig.BOT_PREFIX}rep [username]\n${envConfig.BOT_PREFIX}rep moistbobo\n.rep`,
};

export default Rep;
