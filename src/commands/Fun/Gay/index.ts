import action from './action';

const Gay: Command = {
  action,
  name: 'Gay',
  description: 'Check how gay a user is.',
  triggers: ['gay'],
  exampleUsage: '.gay [username]',
};

export default Gay;
