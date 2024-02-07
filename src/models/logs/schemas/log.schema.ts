import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

import { MachineSchema } from '../../machines/schemas/machine.schema';

@Schema()
class Log {
  @Prop({ type: MachineSchema, required: true })
  machine: typeof MachineSchema;

  @Prop({ required: true })
  datetime: Date;

  @Prop({ required: true })
  imagesCount: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
