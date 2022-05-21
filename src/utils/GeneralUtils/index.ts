import * as Discord from 'discord.js';
import dayjs from 'dayjs';

// eslint-disable-next-line no-promise-executor-return
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const findMemberInServer = (msg: Discord.Message): Discord.GuildMember | null | undefined => {
  const { content, guild } = msg;

  const splitMessage = content.split(' ').map((x) => x.trim());

  if (splitMessage.length < 2) return null;
  if ((guild && !guild.available) || !guild) return null;

  const { members } = guild;

  let mentionedUser = msg.mentions.members && msg.mentions.members.first();
  if (!mentionedUser) {
    mentionedUser = members.cache.find(
      (member: Discord.GuildMember) =>
        member.user.username.toLowerCase() === splitMessage[1].toLowerCase() ||
        member.nickname === splitMessage[1]
    );
  }

  return mentionedUser;
};

const mentionUser = (userId: string) => `<@${userId}>`;

const getDaysSinceTimestamp = (sinceTime: string) => dayjs(dayjs()).diff(dayjs(sinceTime), 'day');

const GeneralUtils = {
  sleep,
  findMemberInServer,
  mentionUser,
  getDaysSinceTimestamp,
};

export default GeneralUtils;
