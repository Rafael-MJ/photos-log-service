import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Machine } from '../../machines/interfaces/machine.interface';
import { Establishment } from '../../establishments/interfaces/establishment.interface';

@Schema({ versionKey: false })
class Log {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Machine' })
  machineId: Machine;

  @Prop({ required: true, type: Number })
  usedPaperCount: number;

  @Prop({ required: true, type: Number })
  usedPrinterInk: number;

  @Prop({ required: true, type: Date })
  datetime: Date;

  @Prop({ required: true, type: Number })
  printedImagesCount: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Establishment' })
  establishmentId: Establishment;
}

export const LogSchema = SchemaFactory.createForClass(Log);
