import envConfig from 'config/envConfig';
import action from './action';

const ToggleRep: Command = {
  action,
  name: 'Toggle Rep',
  triggers: ['tr', 'togglerep'],
  description: 'Enable/Disable receiving/sending rep. 1 week cooldown.',
  exampleUsage: `${envConfig.BOT_PREFIX}tr\n${envConfig.BOT_PREFIX}togglerep`,
};

export default ToggleRep;
