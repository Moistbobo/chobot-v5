import envConfig from 'config/envConfig';
import action from './action';

const RepHistory: Command = {
  action,
  name: 'Reputation History',
  triggers: ['rephistory', 'rh'],
  description: 'Shows the reputation history for the specified user. Defaults to sender.',
  exampleUsage: `${envConfig.BOT_TOKEN}rh [username]\n${envConfig.BOT_TOKEN}rh moistbobo\n${envConfig.BOT_TOKEN}rh`,
};

export default RepHistory;
