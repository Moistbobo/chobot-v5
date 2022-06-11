import { CacheType, Interaction } from 'discord.js';
import MessageUtils from 'utils/MessageUtils';

// Interaction implementation for the WhatIsBot interaction
const interaction = async (args: Interaction<CacheType>) => {
  const { createEmbed } = MessageUtils;

  // @ts-ignore
  await args.reply({
    flags: 64,
    ...createEmbed({
      title: 'What is ChoggaBot?',
      contents: 'ChoggaBot is ChoggaBot',
    }),
  });
};

export default interaction;
