import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
class Machine {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  name: string;

  @Prop({ required: true, type: Number })
  paperStock: number;

  @Prop({ required: true, type: Number })
  inkStock: number;

  @Prop({ required: true, type: String })
  currentEstablishment: string;

  @Prop({ required: true, type: String })
  currentCity: string;

  @Prop({ required: true, type: String })
  currentProvince: string;

  @Prop({ required: false, default: 0, type: Number })
  currentLocalMachineNumber: number;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
