import { Document } from 'mongoose';
import { Machine } from '../../machines/interfaces/machine.interface';

export interface Log extends Document {
  readonly machineId: Machine;
  readonly usedPaper: number;
  readonly usedInk: number;
  readonly datetime: Date;
  readonly printedImagesCount: number;
  readonly establishment: string;
  readonly city: string;
  readonly province: string;
  readonly localMachineNumber: number;
}
