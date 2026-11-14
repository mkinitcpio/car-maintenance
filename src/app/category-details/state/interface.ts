import { Maintenance } from '@core/interfaces/maintenance';
import { CategoryTypeEnum } from 'app/navigation/state/interface';
import { Record } from '../../detail/state/interface';
import { EntityState } from "../../state/interface";

export interface FeatureState<T> {
  categoryDetails: EntityState<T>;
}

export interface CategoryDetail {
  id: string;
  icon: string;
  name: string;
  data: Record[];
}

export interface CategoryDetails {
  data: any;
  icon: string;
  maintenance: Maintenance,
  type: CategoryTypeEnum;
  tables: CategoryDetail[];
}