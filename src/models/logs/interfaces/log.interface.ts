import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export interface Log extends Document {
  readonly _id: mongoose.Schema.Types.ObjectId;
  readonly machine: object;
  readonly datetime: Date;
  readonly imagesCount: number;
}
