import fs from 'fs';
import util from 'util';
import { google } from '@google-cloud/text-to-speech/build/protos/protos';
import googleTTS from '@google-cloud/text-to-speech';
import envConfig from 'config/envConfig';

import SsmlVoiceGender = google.cloud.texttospeech.v1.SsmlVoiceGender;
import AudioEncoding = google.cloud.texttospeech.v1.AudioEncoding;

const makeGTTSFolderIfNotExist = () => {
  if (!fs.existsSync('./gtts')) {
    fs.mkdirSync('./gtts');
  }
};

const writeTTSBinaryToWAV = (ttsByteArray: any, serverID: string): Promise<any> => {
  makeGTTSFolderIfNotExist();
  const [audio] = ttsByteArray;
  const writeFile = util.promisify(fs.writeFile);
  return writeFile(`./gtts/${serverID}.mp3`, audio.audioContent, 'binary');
};

const writeTTSBinaryToWAVFile = (
  ttsByteArray: any,
  serverID: string,
  userId: string
): Promise<any> => {
  makeGTTSFolderIfNotExist();
  const [audio] = ttsByteArray;
  const writeFile = util.promisify(fs.writeFile);
  return writeFile(`./gtts/${serverID}-${userId}.mp3`, audio.audioContent, 'binary');
};

const getLanguage = (msgContent: string) => {
  const [, lang] = msgContent.split(' ');
  const langRegex = /[a-zA-Z]{2,3}-[a-zA-Z]{2}/;
  if (langRegex.test(lang)) {
    return lang;
  }
  return null;
};

const getGender = (msgContent: string) => {
  const [prefix] = msgContent.split(' ');
  const femalePrefix = ['gttsf', 'googlettsf', 'ttsf'];
  const isFemale = femalePrefix.some((x) => `${envConfig.BOT_PREFIX}${x}` === prefix);
  return isFemale ? SsmlVoiceGender.FEMALE : SsmlVoiceGender.MALE;
};

const generateTTS = (textToSpeak: string, lang: string | null, gender: SsmlVoiceGender) => {
  const ttsClient = new googleTTS.TextToSpeechClient();

  const request = {
    input: {
      text: textToSpeak,
    },
    voice: {
      languageCode: lang || 'en-US',
      ssmlGender: gender,
    },
    audioConfig: {
      audioEncoding: AudioEncoding.MP3,
    },
  };

  return ttsClient.synthesizeSpeech(request);
};

export default {
  writeTTSBinaryToWAV,
  getLanguage,
  getGender,
  generateTTS,
  writeTTSBinaryToWAVFile,
};
