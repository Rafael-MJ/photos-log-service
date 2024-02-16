import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import * as mongoose from 'mongoose';
import { Establishment } from '../../establishment/interfaces/establishment.interface';

@Schema({ versionKey: false })
class Machine {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Establishment' })
  currentEstablishmentId: Establishment;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  name: string;

  @Prop({ required: true, type: Number })
  paperStock: number;

  @Prop({ required: true, type: Number })
  printerInkStock: number;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
