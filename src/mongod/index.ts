import Mongoose from 'mongoose';
import envConfig from 'config/envConfig';

const db = 'mongodb://localhost/choggabot';

const connect = () =>
  Mongoose.connect(db, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
      username: envConfig.MONGO_DB_USERNAME,
      password: envConfig.MONGO_DB_PASSWORD,
    },
  });

const disconnect = () => Mongoose.disconnect();

export default {
  connect,
  disconnect,
};
