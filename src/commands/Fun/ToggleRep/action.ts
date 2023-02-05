import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import CommandArgs from 'types/CommandArgs';
import FunResult from 'mongod/schemas/FunResult';
import dayjs from 'dayjs';

const COOLDOWN_TIME_DAYS = 0;

const ToggleRep = async (args: CommandArgs) => {
  const {
    message,
    message: { channel, content, member },
  } = args;

  if (!member) return;

  const { findMemberInServer } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  const { id: authorId, displayName } = member;

  if (content.split(' ').length > 1) {
    const mentionedUser = findMemberInServer(message);

    if (!mentionedUser) return;

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
      await channel.send(embed);
    }

    funResult.reputation.optOutLastUpdate = dayjs().toISOString();
    funResult.reputation.optOut = !funResult.reputation.optOut;

    await funResult.save();

    const embed = createEmbed({
      contents: `${displayName}, you have ${
        funResult.reputation.optOut ? 'enabled rep functions' : 'disabled rep functions'
      }`,
    });

    await channel.send(embed);
  }
};

export default ToggleRep;
