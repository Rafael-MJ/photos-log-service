import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Machine } from '../../machines/interfaces/machine.interface';

@Schema({ versionKey: false })
class Log {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' })
  machineId: Machine;

  @Prop({ required: true, type: Number })
  usedPaper: number;

  @Prop({ required: true, type: Number })
  usedInk: number;

  @Prop({ required: true, type: Date })
  datetime: Date;

  @Prop({ required: true, type: Number })
  printedImagesCount: number;

  @Prop({ required: true, type: String })
  establishment: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  province: string;

  @Prop({ required: false, default: 0, type: Number })
  localMachineNumber: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
