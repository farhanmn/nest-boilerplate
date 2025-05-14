interface SuccessResponse<T> {
  success: true;
  message: string;
  data: T;
  meta?: object;
}

interface ErrorResponse {
  success: false;
  message: string;
  data: object;
}

type ApiResponses<T> = SuccessResponse<T> | ErrorResponse;

export { ApiResponses, SuccessResponse, ErrorResponse };
