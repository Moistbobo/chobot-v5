import 'module-alias/register';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import runBot from './src/runBot';

dayjs.extend(relativeTime);
runBot();
