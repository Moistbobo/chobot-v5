import envConfig from 'config/envConfig';
import action from './action';

const Iq: Command = {
  action,
  name: 'Iq',
  triggers: ['iq'],
  description: "Check a user's IQ.",
  exampleUsage: `${envConfig.BOT_PREFIX}iq \`optional:username or mention\``,
};

export default Iq;
