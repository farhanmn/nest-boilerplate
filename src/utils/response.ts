import { HttpStatus } from '@nestjs/common';

export function metaPagination(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

export function successResponse<T>(message: string, data: T, meta?: T) {
  return {
    success: true,
    message,
    data,
    meta
  };
}

export function errorResponse(
  message: string,
  errorCode = 'Internal Server Error',
  statusCode = HttpStatus.INTERNAL_SERVER_ERROR
) {
  return {
    success: false,
    message,
    errorCode,
    statusCode
  };
}
