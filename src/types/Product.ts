export type Product = {
  id: number;
  name: string;
  price: string;
  orderId: number;
};

type ServiceResponseErrorType =
  | 'INVALID_DATA'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'ERROR'
  | 'UNPROCESSABLE_ENTITY';

export type ServiceResponseError = {
  status: ServiceResponseErrorType;
  data: { message: string };
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL';
  data: T;
};

export type ServiceResponse<T> =
  | ServiceResponseError
  | ServiceResponseSuccess<T>;
