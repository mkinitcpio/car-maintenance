export enum Status {
  Init = 'Init',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

export interface EntityState<T> {
  value: T;
  status: Status;
  error;
}