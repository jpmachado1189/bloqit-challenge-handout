import mongoose, { Document, Schema } from 'mongoose';
const { randomUUID } = require('crypto');

import { LockerStatus } from '../types/LockerStatus';

interface Locker extends Document {
  id: string;
  bloqId: string;
  status: LockerStatus;
  isOccupied: boolean;
}

const LockerSchema: Schema = new Schema({
  id: {
    type: String,
    default: () => randomUUID(),
    unique: true,
  },
  bloqId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: LockerStatus,
    default: LockerStatus.CLOSED,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const LockerModel = mongoose.model<Locker>('Rent', LockerSchema);

export default LockerModel;
