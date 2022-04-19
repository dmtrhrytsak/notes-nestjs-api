import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(private errors: { errors: string[] }) {
    super(errors, HttpStatus.BAD_REQUEST);
  }
}
