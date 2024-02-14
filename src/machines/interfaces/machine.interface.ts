import { Document } from 'mongoose';

export interface Machine extends Document {
  readonly name: string;
  readonly paperStock: number;
  readonly printerInkStock: number;
  readonly currentEstablishment: string;
  readonly currentCity: string;
  readonly currentProvince: string;
}
