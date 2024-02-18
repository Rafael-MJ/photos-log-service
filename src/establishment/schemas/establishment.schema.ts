import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
class Establishment {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  name: string;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  state: string;
}

export const EstablishmentSchema = SchemaFactory.createForClass(Establishment);
