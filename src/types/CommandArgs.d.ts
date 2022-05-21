import { Message, Client } from 'discord.js';

export default interface CommandArgs {
  message: Message;
  client: Client;
  voiceConnections?: {
    [index: string]: BotVoiceConnection;
  };
}
