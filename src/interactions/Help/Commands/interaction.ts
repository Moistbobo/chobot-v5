import { CacheType, Interaction } from 'discord.js';
import MessageUtils from 'utils/MessageUtils';
import commands from 'commands';

// Interaction implementation for the Commands interaction
const interaction = async (args: Interaction<CacheType>) => {
  const { createEmbed } = MessageUtils;

  const commandList = commands.reduce((acc: any, c) => {
    return [...acc, `${c.name}`];
  }, []);

  // @ts-ignore
  await args.reply({
    flags: 64,
    ...createEmbed({
      title: 'Commands',
      contents: `\`\`\`${commandList.join('\n')}\`\`\``,
    }),
  });
};

export default interaction;
