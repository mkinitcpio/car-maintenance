import { Category } from '../../navigation/state/interface';

export interface CarCategory extends Category {
  vehicleId: string;
  make: string;
  model: string;
  year: number;
  engine: string;
  mileage?: number;
}

export interface CarMaintenance {
  id: string;
  status: StatusEnum;
  completedParts: string[];
  note: string;
}

export enum StatusEnum {
  Init,
  InProgress,
  Done,
  Error,
}

export interface CarCategoryFormData extends CarCategory {
  parts: string[],
}
