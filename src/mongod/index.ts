import Mongoose from 'mongoose';

const db = 'mongodb://localhost/choggabot-v4';

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
