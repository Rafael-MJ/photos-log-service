import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class Machine {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  currentEstablishment: string;

  @Prop({ required: true })
  localMachineNumber: number;

  @Prop({ required: true })
  currentCity: string;

  @Prop({ required: true })
  currentProvince: string;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
