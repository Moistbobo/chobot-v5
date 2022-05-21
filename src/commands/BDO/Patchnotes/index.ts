import envConfig from 'config/envConfig';
import action from './action';

const Patchnotes: Command = {
  name: 'Patchnotes',
  triggers: ['pn', 'patchnotes'],
  description: 'Retrieve BDO patchnotes. Past patchnotes caps at 15',
  exampleUsage: `${envConfig.BOT_PREFIX}pn [number of past patchnotes (optional)]\n${envConfig.BOT_PREFIX}pn\n${envConfig.BOT_PREFIX}pn 15`,
  action,
};

export default Patchnotes;
