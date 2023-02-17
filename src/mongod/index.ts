import Mongoose from 'mongoose';
import envConfig from 'config/envConfig';

const db = `mongodb://${envConfig.MONGO_DB_USERNAME}:${envConfig.MONGO_DB_PASSWORD}@localhost/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-256`;

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
