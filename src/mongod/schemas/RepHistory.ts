import { Document, Schema, model } from 'mongoose';

export interface IRepHistory extends Document {
  userId: string;
  senderId: string;
  isIncrease: boolean;
  value?: number;
  time: string;
}

export const RepHistorySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  isIncrease: Boolean,
  time: String,
  value: Number,
});

export const RepHistory = model<IRepHistory>('RepHistory', RepHistorySchema);
