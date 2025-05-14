import {
  ErrorResponse,
  SuccessResponse
} from '../common/types/response.interface';

export function metaPagination(total: number, page: number, limit: number) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit)
  };
}

export function successResponse<T>(
  message: string,
  data: T,
  meta?: object
): SuccessResponse<T> {
  return {
    success: true,
    message,
    data,
    meta
  };
}

export function errorResponse(
  message: string,
  errorCode: string = 'Internal Server Error'
): ErrorResponse {
  return {
    success: false,
    message: message || errorCode,
    data: {}
  };
}
