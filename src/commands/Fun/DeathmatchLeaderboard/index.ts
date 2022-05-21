import envConfig from 'config/envConfig';
import action from './action';

const DeathmatchLeaderboard: Command = {
  action,
  name: 'Deathmatch Leaderboard',
  triggers: ['deathmatchleaderboard', 'dmlb', 'dmwlb'],
  description: 'Show the top 10 Deathmatch wins',
  exampleUsage: `${envConfig.BOT_PREFIX}dmlb`,
};

export default DeathmatchLeaderboard;
