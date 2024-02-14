import { Document } from 'mongoose';
import { Establishment } from '../../establishments/interfaces/establishment.interface';

export interface Machine extends Document {
  readonly name: string;
  readonly paperStock: number;
  readonly printerInkStock: number;
  readonly currentEstablishmentId: Establishment;
}
