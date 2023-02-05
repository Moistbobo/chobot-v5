import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import FunResult from 'mongod/schemas/FunResult';
import dayjs from 'dayjs';

const COOLDOWN_TIME_DAYS = 7;

const ToggleRep = async (args: CommandArgs) => {
  const {
    message: { channel, member },
  } = args;

  if (!member) return;

  const { createEmbed } = MessageUtils;

  const { id: authorId, displayName } = member;

  const funResult =
    (await FunResult.findOne({ userID: authorId })) || new FunResult({ userID: authorId });

  if (
    GeneralUtils.getDaysSinceTimestamp(funResult.reputation.optOutLastUpdate) < COOLDOWN_TIME_DAYS
  ) {
    const embed = createEmbed({
      contents: `${displayName}, toggle rep currently on cooldown.`,
      footer: `Time left: ${dayjs(funResult.reputation.optOutLastUpdate)
        .add(COOLDOWN_TIME_DAYS, 'day')
        .fromNow()}`,
    });
    return channel.send(embed);
  }

  funResult.reputation.optOutLastUpdate = dayjs().toISOString();
  funResult.reputation.optOut = !funResult.reputation.optOut;

  await funResult.save();

  const embed = createEmbed({
    contents: `${displayName}, you have ${
      funResult.reputation.optOut ? 'disabled rep functions' : 'enabled rep functions'
    } \nCommand Cooldown: 1 week.`,
  });

  await channel.send(embed);
};

export default ToggleRep;
