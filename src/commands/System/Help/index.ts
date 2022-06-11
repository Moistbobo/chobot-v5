import envConfig from 'config/envConfig';
import action from './action';

const Help: Command = {
  name: 'CHelp',
  triggers: ['chelp'],
  description: 'Show an interactive help list',
  exampleUsage: `${envConfig.BOT_PREFIX}chelp`,
  action,
};

export default Help;
