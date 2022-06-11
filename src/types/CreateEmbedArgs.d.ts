import { EmbedAuthorData, EmbedFooterData } from 'discord.js';

interface CreateEmbedArgs {
  footer?: string | EmbedFooterData;

  contents?: string;

  title?: string;

  author?: EmbedAuthorData;

  url?: string;

  thumbnail?: string;

  image?: string;

  extraFields?: {
    name: string;

    value: string;

    inline?: boolean;
  }[];
}
