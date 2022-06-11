import { CacheType, Interaction } from 'discord.js';
import MessageUtils from 'utils/MessageUtils';
import envConfig from 'config/envConfig';

// Interaction implementation for the WhatIsCC interaction
const interaction = async (args: Interaction<CacheType>) => {
  const { createEmbed } = MessageUtils;

  // @ts-ignore
  await args.reply({
    flags: 64,
    ...createEmbed({
      title: 'What is ChoCoin?',
      contents: `ChoCoin is a currency exclusive to ChoggaBot. They are used for ChoggaBot commands that require currency. It can only be purchased with the ${envConfig.BOT_PREFIX}ccb command using chollars.\nThe purchase is non-refundable.`,
    }),
  });
};

export default interaction;
