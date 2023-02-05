import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import FunResult from 'mongod/schemas/FunResult';
import { checkIfRepEnabled } from 'utils/RepHelper';

const Rep = async (args: CommandArgs) => {
  const {
    message,
    message: { channel, content, member },
  } = args;

  if (!member) return;

  const { findMemberInServer } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  const { id: authorId, displayName } = member;

  if (await checkIfRepEnabled(channel, member)) {
    return;
  }

  if (content.split(' ').length > 1) {
    const mentionedUser = findMemberInServer(message);

    if (!mentionedUser) return;

    const funResult =
      (await FunResult.findOne({ userID: mentionedUser.id })) ||
      new FunResult({ userID: mentionedUser.id });

    if (await checkIfRepEnabled(channel, mentionedUser)) {
      return;
    }

    const embed = createEmbed({
      title: 'Reputation',
      contents: `${mentionedUser.displayName} has ${funResult.reputation.value} reputation`,
      thumbnail: mentionedUser.user.avatarURL() || mentionedUser.user.defaultAvatarURL,
    });

    await channel.send(embed);
  } else {
    const funResult =
      (await FunResult.findOne({ userID: authorId })) || new FunResult({ userID: authorId });

    const embed = createEmbed({
      title: 'Reputation',
      contents: `${displayName} has ${funResult.reputation.value} reputation`,
      thumbnail: member.user.avatarURL() || member.user.defaultAvatarURL,
    });

    await channel.send(embed);
  }
};

export default Rep;
