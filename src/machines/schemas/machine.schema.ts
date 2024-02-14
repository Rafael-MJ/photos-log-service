import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Establishment } from '../../establishments/interfaces/establishment.interface';

@Schema({ versionKey: false })
class Machine {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  name: string;

  @Prop({ required: true, type: Number })
  paperStock: number;

  @Prop({ required: true, type: Number })
  printerInkStock: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Establishment' })
  currentEstablishmentId: Establishment;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
