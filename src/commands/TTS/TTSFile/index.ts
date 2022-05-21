import action from './action';

const TTSFile: Command = {
  action,
  name: 'TTSFile',
  triggers: ['tts', 'ttsf'],
  description: '',
  requiredPermissions: ['SEND_TTS_MESSAGES'],
};

export default TTSFile;
