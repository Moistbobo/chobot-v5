import envConfig from 'config/envConfig';
import action from './action';

const RepHistory: Command = {
  action,
  name: 'Reputation History',
  triggers: ['rephistory', 'rh'],
  description: 'Shows the reputation history for the specified user. Defaults to sender.',
  exampleUsage: `${envConfig.BOT_PREFIX}rh [username]\n${envConfig.BOT_PREFIX}rh moistbobo\n${envConfig.BOT_PREFIX}rh`,
};

export default RepHistory;
