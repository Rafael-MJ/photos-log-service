import { Document } from 'mongoose';
import { Machine } from '../../machine/interfaces/machine.interface';
import { Establishment } from '../../establishment/interfaces/establishment.interface';

export interface Log extends Document {
  readonly machineId: Machine;
  readonly establishmentId: Establishment;
  readonly usedPaperCount: number;
  readonly usedPrinterInk: number;
  readonly printedImagesCount: number;
  readonly datetime: Date;
}
