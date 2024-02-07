import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Machine {
  @Prop({ required: true })
  name: string;
}

export const MachineSchema = SchemaFactory.createForClass(Machine);
