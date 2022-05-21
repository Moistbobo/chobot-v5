import { MessageAttachment } from 'discord.js';
import CommandArgs from 'types/CommandArgs';
import Tools from './tools';

const action = async (args: CommandArgs) => {
  const {
    message: { channel, member, author, guild, content },
  } = args;

  if (!member || !guild) return;

  const { id: serverId } = guild;

  const lang = Tools.getLanguage(content);
  const gender = Tools.getGender(content);
  const textToSpeak = lang
    ? content.split(' ').slice(2).join(' ')
    : content.split(' ').slice(1).join(' ');

  const ttsAudioBinary = await Tools.generateTTS(textToSpeak, lang, gender);
  await Tools.writeTTSBinaryToWAVFile(ttsAudioBinary, serverId, author.id);

  const attachment = new MessageAttachment(`./gtts/${serverId}-${author.id}.mp3`, 'tts.mp3');

  await channel.send({ files: [attachment] });
};

export default action;
