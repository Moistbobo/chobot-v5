import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import { RepHistory } from 'mongod/schemas/RepHistory';
import { Message } from 'discord.js';
import Tools from './Tools';

const action = async (args: CommandArgs) => {
  const {
    message,
    message: {
      member,
      author: { id: authorId },
      channel,
    },
  } = args;
  if (!member) return;

  const { findMemberInServer, mentionUser } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  const firstMentionedUser = findMemberInServer(message) || member;
  const resultsPerPage = 5;

  const userId = firstMentionedUser ? firstMentionedUser.id : authorId;

  const userRepHistory = await RepHistory.find({ userId }).sort({ time: -1 });

  if (userRepHistory.length === 0) {
    const embed = createEmbed({
      thumbnail: firstMentionedUser.user.avatarURL() || firstMentionedUser.user.defaultAvatarURL,
      contents: `${mentionUser(userId)} has no Reputation history`,
    });
    return channel.send(embed);
  }

  if (userRepHistory.length < resultsPerPage) {
    const embed = createEmbed({
      title: `${firstMentionedUser.displayName}'s Reputation History`,
      thumbnail: firstMentionedUser.user.avatarURL() || firstMentionedUser.user.defaultAvatarURL,
      contents: Tools.renderHistoryItem(userRepHistory),
    });

    return channel.send(embed);
  }

  let index = 0;

  const filter = (reaction: any, user: any) =>
    (reaction.emoji.name === '⬅' || reaction.emoji.name === '➡') && !user.bot;

  const embed = createEmbed({
    title: `${firstMentionedUser.displayName}'s Reputation History`,
    thumbnail: firstMentionedUser.user.avatarURL() || firstMentionedUser.user.defaultAvatarURL,
    contents: Tools.renderHistoryItem(userRepHistory.slice(index, index + resultsPerPage)),
    footer: `Page ${index + 1}/${Math.ceil(userRepHistory.length / resultsPerPage)}`,
  });

  const firstMessage = (await channel.send(embed)) as Message;

  await firstMessage.react('⬅');
  await firstMessage.react('➡');
  const reactionCollector = firstMessage.createReactionCollector({ filter, time: 30000 });

  reactionCollector.on('collect', (reaction: any) => {
    if (reaction.emoji.name === '⬅') {
      index = Math.max(index - 1, 0);
    } else {
      index = Math.min(userRepHistory.length / resultsPerPage, index + 1);
    }

    const newEmbed = createEmbed({
      title: `${firstMentionedUser.displayName}'s Reputation History`,
      thumbnail: firstMentionedUser.user.avatarURL() || firstMentionedUser.user.defaultAvatarURL,
      contents: Tools.renderHistoryItem(
        userRepHistory.slice(index * resultsPerPage, (index + 1) * resultsPerPage)
      ),
      footer: `Page ${index + 1}/${Math.ceil(userRepHistory.length / resultsPerPage)}`,
    });

    firstMessage.edit(newEmbed);
  });
};

export default action;
