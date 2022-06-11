import action from './action';

const Caphras: Command = {
  name: 'Caphras',
  triggers: ['c', 'caphras'],
  description: 'Calculate caphras needed to reach a certain level',
  exampleUsage: '.an [number of past patchnotes (optional)]\n.an',
  action,
};

export default Caphras;
