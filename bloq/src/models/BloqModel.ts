import mongoose, { Document, Schema } from 'mongoose';
const { randomUUID } = require('crypto');

interface Bloq extends Document {
  id: string;
  title: string;
  address: string;
}

const BloqSchema: Schema = new Schema({
  id: {
    type: String,
    default: () => randomUUID(),
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const BloqModel = mongoose.model<Bloq>('Bloq', BloqSchema);

export default BloqModel;
