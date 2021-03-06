import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import dayjs from 'dayjs';
import CommandArgs from 'types/CommandArgs';
import FunResult from 'mongod/schemas/FunResult';
import { RepHistory } from 'mongod/schemas/RepHistory';

const action = async (args: CommandArgs) => {
  const {
    message,
    message: {
      author: { id: senderId },
      member,
      channel,
    },
  } = args;

  const { findMemberInServer, getDaysSinceTimestamp } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  const firstUserMentioned = findMemberInServer(message);

  if (!firstUserMentioned || !member || firstUserMentioned.id === senderId) return;

  const { displayName: receiverName } = firstUserMentioned;
  const { displayName: senderName } = member;

  const senderFun =
    (await FunResult.findOne({ userID: senderId })) || new FunResult({ userID: senderId });
  const receiverFun =
    (await FunResult.findOne({ userID: firstUserMentioned.id })) ||
    new FunResult({ userID: firstUserMentioned.id });

  const {
    reputation: { lastUpdate: senderLastUpdate },
  } = senderFun;
  const {
    reputation: { value: receiverRep },
  } = receiverFun;

  if (getDaysSinceTimestamp(senderLastUpdate) >= 1) {
    senderFun.reputation.lastUpdate = dayjs().toISOString();
    senderFun.reputation.lastTarget = firstUserMentioned.id;
    receiverFun.reputation.value = receiverRep - 1;

    const repHistory = new RepHistory({
      userId: firstUserMentioned.id,
      senderId,
      isIncrease: false,
      time: dayjs().toISOString(),
    });

    const embed = createEmbed({
      contents: `${senderName} has decreased ${receiverName}'s reputation`,
      thumbnail:
        'https://ih1.redbubble.net/image.566561202.6466/ap,550x550,12x16,1,transparent,t.u2.png',
    });

    await channel.send(embed);
    await senderFun.save();
    await repHistory.save();
    await receiverFun.save();
  } else {
    const embed = createEmbed({
      contents: `${senderName}, you have already used your reputation action for the day.`,
      footer: `Next usage: ${dayjs(senderLastUpdate).add(1, 'day').fromNow()}`,
    });

    await channel.send(embed);
  }
};

export default action;
