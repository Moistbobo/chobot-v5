import envConfig from 'config/envConfig';
import action from './action';

const PlusRep: Command = {
  action,
  name: '+Rep',
  triggers: ['+rep', 'plusrep', 'prep', 'rep+'],
  description: 'Give reputation to another user. Does not work for self.',
  exampleUsage: `${envConfig.BOT_PREFIX}+rep [username]`,
};

export default PlusRep;
