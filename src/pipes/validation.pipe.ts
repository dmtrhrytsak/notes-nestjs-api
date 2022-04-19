import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  Paramtype,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { ValidationException } from '../exceptions/validation.exception';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype, type }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(type)) {
      return value;
    }

    const obj = plainToClass(metatype, value);

    const errors = await validate(obj);

    if (errors.length) {
      const formattedErrors = errors.map(
        (error) =>
          `${error.property} - ${Object.values(error.constraints).join(', ')}`,
      );

      throw new ValidationException({ errors: formattedErrors });
    }

    return value;
  }

  private toValidate(type: Paramtype): boolean {
    const types = ['body'];

    return types.includes(type);
  }
}
