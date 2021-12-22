import { Record } from '../../detail/state/interface';
import { EntityState } from "../../state/interface";

export interface FeatureState<T> {
  categoryDetails: EntityState<T>;
}

export interface CategoryDetail {
  id: string;
  name: string;
  data: Record[];
}

export interface CategoryDetails {
  name: string;
  tables: CategoryDetail[];
}