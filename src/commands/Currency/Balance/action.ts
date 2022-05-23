import CommandArgs from 'types/CommandArgs';
import GeneralUtils from 'utils/GeneralUtils';
import _ from 'lodash';
import { UserCC } from 'mongod/schemas/UserCC';
import MessageUtils from 'utils/MessageUtils';

const action = async (args: CommandArgs) => {
  const {
    message,
    message: { channel, author },
  } = args;

  const { findMemberInServer } = GeneralUtils;
  const { createEmbed } = MessageUtils;

  const user = _.get(findMemberInServer(message), 'user', author);

  const userCC = (await UserCC.findOne({ userId: user.id })) || new UserCC({ userId: user.id });
  await userCC.save();

  channel.send(
    createEmbed({
      title: `${user.tag} ChoCoin Balance`,
      thumbnail: user.avatarURL() || user.defaultAvatarURL,
      extraFields: [
        {
          name: 'Current ChoCoins',
          value: String(userCC.ccAmount),
        },
        {
          name: 'Lifetime ChoCoins',
          value: String(userCC.totalCCPurchased),
        },
      ],
    })
  );
};

export default action;
