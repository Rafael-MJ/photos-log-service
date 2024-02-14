import { Document } from 'mongoose';

export interface Establishment extends Document {
  readonly name: string;
  readonly address: string;
  readonly city: string;
  readonly province: string;
}
