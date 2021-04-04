export interface SuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse<T> {
  statusCode: number;
  message: T;
  error: Error;
}

export type GeneralResponse<T, K> = SuccessResponse<T> | ErrorResponse<K>;
