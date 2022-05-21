import dayjs from 'dayjs';
import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import FunResult from 'mongod/schemas/FunResult';

const action = async (args: CommandArgs) => {
  const {
    message,
    message: { channel, author },
  } = args;

  const { findMemberInServer } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  let targetUser;

  const mentionedUser = findMemberInServer(message);
  if (!mentionedUser) {
    targetUser = author;
  } else {
    targetUser = mentionedUser.user;
  }

  const funResult =
    (await FunResult.findOne({ userID: targetUser.id })) ||
    new FunResult({ userID: targetUser.id });

  const {
    gay: { lastUpdate },
  } = funResult;

  if (dayjs(dayjs()).diff(lastUpdate, 'days') >= 1) {
    const gayValue = Math.floor(Math.random() * 1000);

    funResult.gay.lastUpdate = dayjs().toISOString();
    funResult.gay.value = gayValue;
    funResult.userID = targetUser.id;

    const embed = createEmbed({
      contents: `${targetUser.username} is **${gayValue}%** gay.`,
      thumbnail: targetUser.avatarURL() || targetUser.defaultAvatarURL,
    });

    await funResult.save();
    await channel.send(embed);
  } else {
    const embed = createEmbed({
      contents: `${targetUser.username} is **${funResult.gay.value}%** gay.`,
      thumbnail: targetUser.avatarURL() || targetUser.defaultAvatarURL,
      footer: `Next check: ${dayjs(funResult.gay.lastUpdate).add(1, 'day').fromNow()}`,
    });

    await channel.send(embed);
  }
};

export default action;
