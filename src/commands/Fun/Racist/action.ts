import MessageUtils from 'utils/MessageUtils';
import FunResult from 'mongod/schemas/FunResult';
import GeneralUtils from 'utils/GeneralUtils';
import dayjs from 'dayjs';
import CommandArgs from 'types/CommandArgs';
import Tools from './tools';

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

  if (targetUser.id === '128031927356620800') {
    const embed = createEmbed({
      contents: 'You are brandon.',
      thumbnail: targetUser.avatarURL() || targetUser.defaultAvatarURL,
    });

    await channel.send(embed);
    return;
  }

  const funResult =
    (await FunResult.findOne({ userID: targetUser.id })) ||
    new FunResult({ userID: targetUser.id });

  const {
    racist: { lastUpdate },
  } = funResult;

  if (dayjs(dayjs()).diff(lastUpdate, 'days') >= 1) {
    const racistValue = Math.floor(Math.random() * 1000);

    funResult.racist.lastUpdate = dayjs().toISOString();
    funResult.racist.value = racistValue;
    funResult.userID = targetUser.id;

    const racistLevel = Tools.mapRacistLevel(racistValue);

    const embed = createEmbed({
      contents: `${targetUser.username} is **${racistValue}** brandons racist ${Tools.description[racistLevel]}`,
      thumbnail: targetUser.avatarURL() || targetUser.defaultAvatarURL,
      image:
        Tools.images[racistLevel][Math.floor(Math.random() * Tools.images[racistLevel].length)],
    });

    await funResult.save();
    await channel.send(embed);
  } else {
    const racistLevel = Tools.mapRacistLevel(funResult.racist.value);

    const embed = createEmbed({
      // eslint-disable-next-line max-len
      contents: `${targetUser.username} is **${funResult.racist.value}** brandons racist ${Tools.description[racistLevel]}`,
      thumbnail: targetUser.avatarURL() || targetUser.defaultAvatarURL,
      image:
        Tools.images[racistLevel][Math.floor(Math.random() * Tools.images[racistLevel].length)],
      footer: `Next check: ${dayjs(funResult.racist.lastUpdate).add(1, 'day').fromNow()}`,
    });

    await channel.send(embed);
  }
};

export default action;
