import mongoose, { Document, Schema } from 'mongoose';
const { randomUUID } = require('crypto');

import { RentSize } from '../types/RentSize';
import { RentStatus } from '../types/RentStatus';

interface Rent extends Document {
  id: string;
  lockerId: string | null;
  weight: number;
  size: RentSize;
  status: RentStatus;
  createdAt: Date;
  pickedUpAt: Date | null;
  droppedOffdAt: Date | null;
}

const RentSchema: Schema = new Schema({
  id: {
    type: String,
    default: () => randomUUID(),
    unique: true,
  },
  lockerId: {
    type: String,
    default: null,
    unique: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    enum: RentSize,
    required: true,
  },
  status: {
    type: String,
    enum: RentStatus,
    default: RentStatus.CREATED,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pickedUpAt: {
    type: Date,
    default: null,
  },
  DroppedOffAt: {
    type: Date,
    default: null,
  },
});

const RentModel = mongoose.model<Rent>('Rent', RentSchema);

export default RentModel;
