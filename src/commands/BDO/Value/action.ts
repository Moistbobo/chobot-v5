import Embed from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import tools from './tools';

const action = (args: CommandArgs) => {
  const { formatNumber, toMachineReadable, startsWithNumber, formattedPrice } = tools;

  const {
    message: { content, channel },
  } = args;
  if (content.split(' ').length < 2) return;

  const originalValue = content.split(' ')[1].toLowerCase();
  const fame = content.split(' ')[2];

  const priceBeforeConversion = originalValue.replace(/,/g, '');
  let sellingPrice = 0;

  if (originalValue.includes('b') || originalValue.includes('m') || originalValue.includes('k')) {
    sellingPrice = toMachineReadable(priceBeforeConversion);
    if (sellingPrice === -1 || !startsWithNumber(originalValue)) {
      return;
    }
  } else {
    sellingPrice = parseFloat(priceBeforeConversion);
  }

  const baseSellPrice = sellingPrice * 0.65;
  const valuePackPrice = baseSellPrice * 1.3;

  const fameMult = tools.fameMap[parseInt(fame, 10)];
  const fameBonus = baseSellPrice * (fameMult || 0);

  const finalSellingPrice = valuePackPrice + fameBonus;

  const needHumanReadable = baseSellPrice > 1000000;
  return channel.send(
    Embed.createEmbed({
      thumbnail: 'https://bddatabase.net/items/new_icon/00000001_special.png',
      contents: `An item sold for \`${formatNumber(sellingPrice)}\` will earn 
      
      ${formattedPrice(baseSellPrice, needHumanReadable)} without value pack
      
      ${
        fameBonus !== 0
          ? `${formattedPrice(finalSellingPrice, needHumanReadable)}with value pack and fame bonus`
          : `${formattedPrice(valuePackPrice, needHumanReadable)}with value pack`
      }
    
    ${
      fameBonus !== 0
        ? `With a fame bonus of ${formattedPrice(fameBonus, needHumanReadable)} \`(${
            fameMult * 100
          }%)\``
        : 'Not including fame bonus.'
    }`,
    })
  );
};

export default action;
