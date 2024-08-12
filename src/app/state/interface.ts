export interface FeatureState<T> {
  entity: EntityState<T>;
  newEntity: EntityState<T>;
  editEntity: EntityState<string>;
  deleteEntity: EntityState<string[]>;
  moveEntity?: EntityState<T>;
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

