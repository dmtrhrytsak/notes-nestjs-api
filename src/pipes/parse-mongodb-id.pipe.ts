import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseMongodbId implements PipeTransform<string, Types.ObjectId> {
  transform(id: string): Types.ObjectId {
    if (
      Types.ObjectId.isValid(id) &&
      new Types.ObjectId(id).toString() === id
    ) {
      return new Types.ObjectId(id);
    } else {
      throw new BadRequestException(`${id} is not a valid id`);
    }
  }
}
