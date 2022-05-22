import { Document, Schema, model } from 'mongoose';

export interface IDeathmatchStats extends Document {
  userID: string;
  wins: number;
  losses: number;
}

export const DeathmatchStatsSchema = new Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
});

const DeathmatchStats = model<IDeathmatchStats>('DeathmatchStats', DeathmatchStatsSchema);
export default DeathmatchStats;
