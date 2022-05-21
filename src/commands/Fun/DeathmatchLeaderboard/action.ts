import FunResult from 'mongod/schemas/FunResult';
import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';

const action = async (args: CommandArgs) => {
  const {
    message: { channel, guild, member },
  } = args;
  const { mentionUser } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  if (!guild || !member) return;

  const test = guild.members;

  const memberList = await test.list();

  const top10Wins = await FunResult.find({}).sort({ deathmatchWins: -1 });

  const idOnly = memberList.map((x) => x.id);
  const membersInServerLeaderboard = top10Wins.filter((x) => idOnly.find((y) => y === x.userID));
  membersInServerLeaderboard.length = 10;

  const embed = createEmbed({
    title: 'Deathmatch Leaderboard',
    extraFields: membersInServerLeaderboard.map((x, index) => ({
      name: `Rank ${index + 1}`,
      value: `${mentionUser(x.userID)}\nWins: ${x.deathmatchWins}`,
    })),
  });

  return channel.send(embed);
};

export default action;
