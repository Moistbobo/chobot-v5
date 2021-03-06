import { Client, Intents } from 'discord.js';
import envConfig from 'config/envConfig';
import commands from 'commands';
import mongodb from './mongod';
import interactions from './interactions';

const runBot = () => {
  const client = new Client({
    intents: [
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
    ],
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag}`);
  });

  client.on('interactionCreate', (interaction) => {
    const interactionToUse = interactions.find(
      // @ts-ignore
      (x) => x.id === interaction.customId || x.id === interaction.values[0]
    );

    if (interactionToUse) interactionToUse.interaction(interaction);
  });

  client.on('messageCreate', async (message) => {
    const userCommand = message.content
      .split(' ')[0]
      .toLowerCase()
      .replace(envConfig.BOT_PREFIX, '')
      .trim();

    const commandToRun: Command | undefined = commands.find((command) => {
      if (command.name.toLowerCase() === userCommand || command.triggers.includes(userCommand)) {
        return command;
      }

      return null;
    });

    if (commandToRun) commandToRun.action({ message, client });
  });

  mongodb.connect();
  client.login(envConfig.BOT_TOKEN);
};

export default runBot;
