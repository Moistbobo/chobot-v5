import envConfig from 'config/envConfig';
import action from './action';

const Balance: Command = {
  name: 'ChoCoinBalance',
  triggers: ['ccb'],
  description: 'Check how many ChoCoins you have',
  exampleUsage: `${envConfig.BOT_PREFIX}ccb`,
  action,
};

export default Balance;
