import FunResult from 'mongod/schemas/FunResult';
import { GuildMember } from 'discord.js';
import MessageUtils from 'utils/MessageUtils';

// eslint-disable-next-line import/prefer-default-export
export const checkIfRepEnabled = async (channel: any, userToCheck: GuildMember) => {
  const userFunResult =
    (await FunResult.findOne({ userID: userToCheck.id })) ||
    new FunResult({ userID: userToCheck.id });

  const {
    reputation: { optOut },
  } = userFunResult;

  console.log('optOut rep?', optOut);

  if (optOut) {
    const embed = MessageUtils.createEmbed({
      contents: `${userToCheck.displayName} has rep functions disabled.`,
    });
    await channel.send(embed);
    return true;
  }
};
