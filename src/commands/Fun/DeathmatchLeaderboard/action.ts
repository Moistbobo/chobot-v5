import DeathmatchStats from 'mongod/schemas/Deathmatch';
import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import numeral from 'numeral';

const action = async (args: CommandArgs) => {
  const {
    message: { channel, guild, member },
  } = args;
  const { mentionUser } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  if (!guild || !member) return;

  const top10Wins = await DeathmatchStats.find({}).sort({ wins: -1 });
  const allMembers = await guild.members.fetch();
  const allMemberIds = allMembers.map((x) => x.id);

  const filteredList = top10Wins.filter((x) => allMemberIds.includes(x.userID) && x.wins > 0);
  filteredList.length = 10;

  const embed = createEmbed({
    title: 'Deathmatch Leaderboard',
    extraFields: filteredList.map((x, index) => {
      const userdata = allMembers.find((y) => y.id === x.userID);

      return {
        name: `Rank ${index + 1}`,
        value: `${mentionUser(x.userID)} - ${userdata?.user.tag}\nWins: ${x.wins}\n(W/R: ${numeral(
          x.wins / (x.wins + x.losses)
        ).format('0.00%')})`,
      };
    }),
  });

  return channel.send(embed);
};

export default action;
