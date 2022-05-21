interface CommandArgs {
  message: Discord.Message;
  voiceConnections?: {
    [index: string]: BotVoiceConnection;
  };
}
