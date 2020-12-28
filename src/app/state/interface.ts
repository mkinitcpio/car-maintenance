export interface FeatureState<T> {
  entity: EntityState<T>;
  newEntity: EntityState<T>;
  editEntity: EntityState<T>;
  deleteEntity: EntityState<T>;
}

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

