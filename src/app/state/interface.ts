import { Category } from "../navigation/state/interface";

export interface FeatureState<T> {
  entity: EntityState<T>;
  newEntity: EntityState<T>;
  editEntity: EntityState<string>;
  deleteEntity: EntityState<Category>;
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

