import { CarCategory } from '@core/interfaces/car-category';
import { Maintenance } from '@core/interfaces/maintenance';
import { CategoryTypeEnum } from '@core/state/features/car-category/enums';
import { Category } from 'app/navigation/state/interface';
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
  data: CarCategory | Category;
  maintenance: Maintenance,
  type: CategoryTypeEnum;
  tables: CategoryDetail[];
}