import { Document, Schema, model } from 'mongoose';

export interface IUserCC extends Document {
  userId: string;
  ccAmount: number;
  totalCCPurchased: number;
}

export const UserCCSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  ccAmount: {
    type: Number,
    default: 0,
  },
  totalCCPurchased: {
    type: Number,
    default: 0,
  },
});

export const UserCC = model<IUserCC>('UserCC', UserCCSchema);
