import dayjs from 'dayjs';
import { IRepHistory } from 'mongod/schemas/RepHistory';
import GeneralUtils from 'utils/GeneralUtils';

const renderHistoryItem = (repHistory: IRepHistory[]) =>
  repHistory
    .map(
      (x) =>
        `${x.isIncrease ? '⬆ Increase' : '⬇ Decrease'}\nSender: ${GeneralUtils.mentionUser(
          x.senderId
        )} ${x.value ? `${x.value} (-rep cost)` : ''} \nSent on: ${dayjs(x.time).format(
          'MM-DD-YYYY'
        )}`
    )
    .join('\n\n');

export default {
  renderHistoryItem,
};
