import { Document } from 'mongoose';
import { Machine } from '../../machines/interfaces/machine.interface';
import { Establishment } from '../../establishments/interfaces/establishment.interface';

export interface Log extends Document {
  readonly machineId: Machine;
  readonly usedPaperCount: number;
  readonly usedPrinterInk: number;
  readonly datetime: Date;
  readonly printedImagesCount: number;
  readonly establishmentId: Establishment;
}
