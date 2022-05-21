import envConfig from 'config/envConfig';
import action from './action';

const MinusRep: Command = {
  action,
  name: '-Rep',
  triggers: ['-rep', 'minusRep', 'mrep', 'nrep', 'rep-'],
  description: 'Take away rep from a user. Does not work on self.',
  exampleUsage: `${envConfig.BOT_PREFIX}-rep [username]`,
};

export default MinusRep;
