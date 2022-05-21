import * as Discord from 'discord.js';

const createEmbed = (args: any, error = false) => {
  const { footer, contents, author, url, title, image, thumbnail, extraFields } = args;

  const embed = new Discord.MessageEmbed().setColor(error ? '#f08080' : '#499369');

  if (footer) embed.setFooter(footer);
  if (contents) embed.setDescription(contents);
  if (title) embed.setTitle(title);
  if (author) embed.setAuthor(author);
  if (url) embed.setURL(url);
  if (image) embed.setImage(image);
  if (thumbnail) embed.setThumbnail(thumbnail);

  if (extraFields) {
    extraFields.forEach((ef: any) => {
      if (ef !== null) {
        embed.addField(ef.name || '', ef.value || '', ef.inline || false);
      }
    });
  }

  return embed;
};

const createMessage = (contents: string, isError?: boolean) => createEmbed({ contents }, isError);

export default {
  createEmbed,
  createMessage,
};
