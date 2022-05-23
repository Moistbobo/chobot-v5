import sqlite3 from 'sqlite3';
import CommandArgs from 'types/CommandArgs';
import envConfig from 'config/envConfig';
import MessageUtils from 'utils/MessageUtils';
import { UserCC } from 'mongod/schemas/UserCC';
import GeneralUtils from 'utils/GeneralUtils';

// chollars:BCC
const CCRATE = 1;

const action = async (args: CommandArgs) => {
  const {
    message: {
      author: { id },
      content,
      channel,
    },
  } = args;

  const { createEmbed, createMessage } = MessageUtils;
  const { mentionUser } = GeneralUtils;

  if (content.split(' ').length < 2) return;

  const ccToBuy = Number(content.split(' ')[1]);
  if (Number.isNaN(Number(ccToBuy))) return;

  const chollarCost = CCRATE * Number(ccToBuy);

  const preCheckMsg = await channel.send({
    ...createEmbed({
      contents: ` ${mentionUser(
        id
      )}, Use ${chollarCost} chollars to purchase ${ccToBuy} ChoCoins?\nThis transaction is non-refundable.`,
      footer: `Only reactions from the mentioned user will be processed.`,
    }),
  });

  await preCheckMsg.react('✅');

  const reactionFilter = (reaction: any, user: any) => {
    return reaction.emoji.name === '✅' && user.id === id;
  };
  const reactionCollector = await preCheckMsg.createReactionCollector({
    time: 15000,
    filter: reactionFilter,
  });

  reactionCollector.on('collect', () => {
    reactionCollector.stop('Finished collection');

    const db = new sqlite3.Database(envConfig.NADEKO_DB_PATH);
    db.serialize(async () => {
      db.run('PRAGMA journal_mode=WAL;');

      const userCC = (await UserCC.findOne({ userId: id })) || new UserCC({ userId: id });

      db.get(`SELECT * from DiscordUser WHERE UserId = ${id}`, (err, row) => {
        const { CurrencyAmount } = row;

        if (CurrencyAmount < chollarCost) {
          preCheckMsg.edit(
            createMessage('You do not have enough chollars to complete the purchase.', true)
          );
        } else {
          db.exec(
            `UPDATE DiscordUser SET CurrencyAmount = ${
              CurrencyAmount - chollarCost
            } WHERE UserId = ${id}`
          );
          db.exec(
            `INSERT into CurrencyTransactions(Amount,Note, UserId, DateAdded, type) VALUES (${-chollarCost}, 'ChoCoin purchase (Rate: ${CCRATE}:1)' ,${id}, CURRENT_TIMESTAMP, 'ChoCoin Purchase')`
          );

          userCC.ccAmount = userCC.ccAmount + ccToBuy;
          userCC.totalCCPurchased = userCC.totalCCPurchased + ccToBuy;

          userCC.save();

          preCheckMsg.edit(createMessage(`Successfully purchased ${ccToBuy} ChoCoins`));
        }
      });
    });
  });
};

export default action;
