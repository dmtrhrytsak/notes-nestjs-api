import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Category } from '../enums/category.enum';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: Category.Task })
  category: Category;

  @Prop({ default: false })
  archived: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
