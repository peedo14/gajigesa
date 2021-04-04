import { HTTP_STATUS } from 'src/constants/http';

interface ICustomErrorResponse {
  statusCode: number;
  message: string;
  error: Error;
}

export const FormatErrorResponse = (
  e: Error,
  status?: number,
): ICustomErrorResponse => {
  return {
    statusCode: status ? status : HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: e?.message ?? 'Internal Server Error',
    error: e,
  };
};
