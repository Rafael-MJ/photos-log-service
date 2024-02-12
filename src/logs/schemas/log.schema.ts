import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
class Log {
  @Prop({ type: String, required: true, lowercase: true, trim: true })
  machineName: string;

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

  @Prop({ required: false, type: Number })
  localMachineNumber: number;
}

export const LogSchema = SchemaFactory.createForClass(Log);
