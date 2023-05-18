import Discord from 'discord.js';
import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import dayjs from 'dayjs';
import FunResult from 'mongod/schemas/FunResult';
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

  const funResult =
    (await FunResult.findOne({ userID: targetUser.id })) ||
    new FunResult({ userID: targetUser.id });

  const {
    iq: { lastUpdate },
  } = funResult;

  if (dayjs(dayjs()).diff(lastUpdate, 'days') >= 1) {
    const iqValue = Math.floor(Math.random() * Math.floor(400));

    funResult.iq.value = iqValue;
    funResult.iq.lastUpdate = dayjs().toISOString();

    const iqImage = await Tools.generateIQImage(iqValue);
    console.log('[DEBUG]: writing iq image');
    await iqImage.writeAsync(`./iqTest/${targetUser.id}.png`);
    const attachment = new Discord.MessageAttachment(
      `./iqTest/${targetUser.id}.png`,
      `iqTest-${targetUser.id}.png`
    );
    await funResult.save();

    console.log('[DEBUG]: creating embed');
    const embed = createEmbed({
      // eslint-disable-next-line max-len
      contents: `${targetUser.username}'s iq is **${iqValue}**\n${
        iqValue > 300 ? "Don't worry, you're still stupid" : ''
      }`,
      thumbnail: targetUser.avatarURL() || targetUser.defaultAvatarURL,
      image: `attachment://iqTest-${targetUser.id}.png`,
    });

    await channel.send({ ...embed, files: [attachment] });
  } else {
    console.log('[DEBUG]: iq image already exists');
    const {
      iq: { value: iqValue, lastUpdate: _lastUpdate },
    } = funResult;

    console.log('[DEBUG]: attempting to find generated iq image...');

    const attachment = new Discord.MessageAttachment(
      `./iqTest/${targetUser.id}.png`,
      `iqTest-${targetUser.id}.png`
    );

    const embed = createEmbed({
      // eslint-disable-next-line max-len
      contents: `${targetUser.username}'s iq is **${iqValue}**\n${
        iqValue > 300 ? "Don't worry, you're still stupid" : ''
      }`,
      footer: `Next check: ${dayjs(_lastUpdate).add(1, 'day').fromNow()}`,
      thumbnail: targetUser.avatarURL() || targetUser.defaultAvatarURL,
      image: `attachment://iqTest-${targetUser.id}.png`,
    });

    await channel.send({ ...embed, files: [attachment] });
  }
};

export default action;
