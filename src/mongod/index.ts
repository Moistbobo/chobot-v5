import Mongoose from 'mongoose';
import envConfig from 'config/envConfig';

const db = envConfig.MONGO_CONNECTION_URI;

const connect = () =>
  Mongoose.connect(db, {
    // @ts-ignore
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const disconnect = () => Mongoose.disconnect();

export default {
  connect,
  disconnect,
};
