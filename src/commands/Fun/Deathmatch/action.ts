import GeneralUtils from 'utils/GeneralUtils';
import MessageUtils from 'utils/MessageUtils';
import DeathmatchStats from 'mongod/schemas/Deathmatch';
import CommandArgs from 'types/CommandArgs';

const action = async (args: CommandArgs) => {
  const {
    message,
    message: {
      channel,
      member,
      author: { id: authorId },
    },
  } = args;

  const { mentionUser, findMemberInServer, sleep } = GeneralUtils;
  const { createMessage, createEmbed } = MessageUtils;

  const mentionedUser = findMemberInServer(message);

  if (!mentionedUser || !member) {
    return channel.send(createMessage('Specify someone to fight', true));
  }
  if (mentionedUser.id === authorId) {
    return channel.send(createMessage("You can't fight yourself", true));
  }

  let fighterAHp = 100;
  let fighterBHp = 100;

  let fighterATurn = Math.random() < 0.5;

  const initialEmbed = MessageUtils.createEmbed({
    title: `${member.displayName} V.S ${mentionedUser.displayName}`,
    extraFields: [
      {
        name: `${member.displayName} HP`,
        value: `${fighterAHp}`,
        inline: true,
      },
      {
        name: `${mentionedUser.displayName} HP`,
        value: `${fighterBHp}`,
        inline: true,
      },
      {
        name: 'Battle Status',
        value: `The fight has begun ${
          fighterATurn ? `${mentionUser(authorId)}` : `${mentionUser(mentionedUser.id)}`
        } gets first move`,
      },
    ],
  });

  const fightMessage = await channel.send(initialEmbed);

  let oldMessage = '';

  while (fighterAHp > 0 && fighterBHp > 0) {
    // eslint-disable-next-line no-await-in-loop
    await GeneralUtils.sleep(2000);

    const damage = Math.floor(Math.random() * 40 + 5);

    let newMessage = '';

    if (fighterATurn) {
      fighterBHp -= damage;
      newMessage = `${mentionUser(authorId)} has dealt ${damage} damage to ${mentionUser(
        mentionedUser.id
      )}`;
      // eslint-disable-next-line max-len
      oldMessage =
        `${member.displayName} has dealt ${damage} damage to ${mentionedUser.displayName}!`.concat(
          '\n\n',
          oldMessage
        );
    } else {
      fighterAHp -= damage;
      newMessage = `${GeneralUtils.mentionUser(
        mentionedUser.id
      )} has dealt ${damage} damage to ${mentionUser(authorId)}`;
      // eslint-disable-next-line max-len
      oldMessage =
        `${mentionedUser.displayName} has dealt ${damage} damage to ${member.displayName}!`.concat(
          '\n\n',
          oldMessage
        );
    }

    // const newEmbed = MessageUtils.createEmbed({
    //   title: `${member.displayName} V.S ${mentionedUser.displayName}`,
    //   contents: `\`\`\`
    //   ${member.displayName} HP: ${fighterAHp}\n${mentionedUser.displayName} HP: ${fighterBHp}\n\n
    //   ${newMessage}\`\`\`\n\n
    //   \`\`\`Battle Log:\n\n${oldMessage}\`\`\``,
    // });

    const newEmbed = createEmbed({
      title: `${member.displayName} V.S ${mentionedUser.displayName}`,
      extraFields: [
        {
          name: `${member.displayName} HP`,
          value: `${fighterAHp}`,
          inline: true,
        },
        {
          name: '⠀⠀',
          value: `${fighterATurn ? '➡️' : '⬅️'}\n${damage}`,
          inline: true,
        },
        {
          name: `${mentionedUser.displayName} HP`,
          value: `${fighterBHp}`,
          inline: true,
        },
        {
          name: 'Battle Status',
          value: `${newMessage}`,
        },
      ],
    });

    // eslint-disable-next-line no-await-in-loop
    await fightMessage.edit(newEmbed);

    fighterATurn = !fighterATurn;
  }

  await sleep(1500);

  const winMessage =
    fighterAHp > 0
      ? `${mentionUser(authorId)} has defeated ${mentionUser(mentionedUser.id)}`
      : `${mentionUser(mentionedUser.id)} has defeated ${mentionUser(authorId)}`;

  const newEmbed = createEmbed({
    title: `${member.displayName} V.S ${mentionedUser.displayName}`,
    extraFields: [
      {
        name: `${member.displayName} HP`,
        value: `${fighterAHp}`,
        inline: true,
      },
      {
        name: `${mentionedUser.displayName} HP`,
        value: `${fighterBHp}`,
        inline: true,
      },
      {
        name: 'Battle Status',
        value: `🏆 ${winMessage} 🏆`,
      },
    ],
  });

  const winnerDMStat =
    (await DeathmatchStats.findOne({ userID: fighterAHp > 0 ? authorId : mentionedUser.id })) ||
    new DeathmatchStats({ userID: fighterAHp > 0 ? authorId : mentionedUser.id });
  winnerDMStat.wins += 1;
  await winnerDMStat.save();

  const loserDMStat =
    (await DeathmatchStats.findOne({ userID: fighterAHp > 0 ? mentionedUser.id : authorId })) ||
    new DeathmatchStats({ userID: fighterAHp > 0 ? mentionedUser.id : authorId });
  loserDMStat.losses += 1;
  await loserDMStat.save();

  await fightMessage.edit(newEmbed);
};

export default action;
