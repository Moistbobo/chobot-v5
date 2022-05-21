import { Document, Schema, model } from 'mongoose';

export interface IFunObject extends Document {
  lastUpdate: string;
  value: number;
}

export interface IFunResult extends Document {
  userID: string;
  gay: IFunObject;
  iq: IFunObject;
  racist: IFunObject;
  reputation: {
    value: number;
    lastUpdate: string;
    lastTarget: string;
  };
  deathmatchWins: number;
}

export const FunObjectSchema = new Schema({
  lastUpdate: {
    type: String,
    default: 0,
    required: true,
  },
  value: Number,
});

const defaultFunObject = {
  lastUpdate: '1970-01-01T00:00:00Z',
};

export const FunResultSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  gay: {
    type: FunObjectSchema,
    default: defaultFunObject,
  },
  iq: {
    type: FunObjectSchema,
    default: defaultFunObject,
  },
  racist: {
    type: FunObjectSchema,
    default: defaultFunObject,
  },
  reputation: {
    value: {
      type: Number,
      default: 0,
    },
    lastUpdate: {
      type: String,
      default: '1970-01-01T00:00:00Z',
    },
    lastTarget: {
      type: String,
      default: '',
    },
  },
  deathmatchWins: {
    type: Number,
    default: 0,
  },
});

const FunResult = model<IFunResult>('FunResult', FunResultSchema);
export default FunResult;
