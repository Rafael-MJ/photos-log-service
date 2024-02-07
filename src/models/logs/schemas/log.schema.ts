import { Schema } from 'mongoose';

import { MachineSchema } from '../../machines/schemas/machine.schema';

export const LogSchema = new Schema({
  machine: MachineSchema,
  datetime: Date,
  imagesCount: Number,
});
