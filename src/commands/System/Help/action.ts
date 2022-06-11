import CommandArgs from 'types/CommandArgs';
import { MessageActionRow, MessageSelectMenu } from 'discord.js';
import MessageUtils from 'utils/MessageUtils';
import { INTERACTION_TYPE } from 'config/interactionConfig';

const action = async (args: CommandArgs) => {
  const { message } = args;

  const selectMenu = new MessageSelectMenu().setCustomId('help-menu').addOptions(
    {
      label: 'What is ChoggaBot?',
      value: INTERACTION_TYPE.HELP_WHAT_IS_BOT,
      description: 'Learn more about ChoggaBot.',
    },
    {
      label: 'What are ChoCoins?',
      value: INTERACTION_TYPE.HELP_WHAT_IS_CC,
      description: "Information about ChoCoin, Choggabot's currency.",
    },
    {
      label: 'What are your Commands?',
      value: INTERACTION_TYPE.HELP_COMMANDS,
      description: 'Show a list of commands',
    }
  );

  const row = new MessageActionRow().addComponents(selectMenu);

  const { createEmbed } = MessageUtils;

  await message.channel.send({
    ...createEmbed({ contents: 'Select an option' }),

    components: [row],
  });
};

export default action;
