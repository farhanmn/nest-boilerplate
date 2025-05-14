import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedAuthException extends HttpException {
  constructor(message = 'Invalid email or password') {
    super(
      {
        statusCode: HttpStatus.UNAUTHORIZED,
        message,
        error: 'Unauthorized'
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}
