import envConfig from 'config/envConfig';
import action from './action';

const BuyChoCoin: Command = {
  name: 'BuyChoCoin',
  triggers: ['bcc'],
  description:
    'Buy ChoCoin using chollars. ChoCoin is the currency used for all commands on this bot',
  exampleUsage: `${envConfig.BOT_PREFIX}bcc \`amount of bcc to buy\``,
  action,
};

export default BuyChoCoin;
