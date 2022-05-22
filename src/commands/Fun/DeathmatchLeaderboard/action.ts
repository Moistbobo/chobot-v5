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

  const top10Wins = await FunResult.find({}).sort({ deathmatchWins: -1 });
  const allMembers = await guild.members.fetch();
  const allMemberIds = allMembers.map((x) => x.id);

  const filteredList = top10Wins.filter(
    (x) => allMemberIds.includes(x.userID) && x.deathmatchWins > 0
  );
  filteredList.length = 20;

  const embed = createEmbed({
    title: 'Deathmatch Leaderboard',
    extraFields: filteredList.map((x, index) => ({
      name: `Rank ${index + 1}`,
      value: `${mentionUser(x.userID)}\nWins: ${x.deathmatchWins}`,
    })),
  });

  return channel.send(embed);
};

export default action;
