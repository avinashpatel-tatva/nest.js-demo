import { HttpException, HttpStatus } from '@nestjs/common';

export class PatientAlreadyDefinedException extends HttpException {
  constructor(name: string) {
    super({
      statusCode: HttpStatus.CONFLICT,
      message: `Patient with Name ${name} already defined.`,
      error: 'Conflict',
    }, HttpStatus.CONFLICT);
  }
}
