import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';

import { Category } from '../enums/category.enum';

export class BaseNoteDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  readonly content: string;

  @IsEnum(Category)
  readonly category: Category;
}
