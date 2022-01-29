import { Category } from "app/navigation/state/interface";
import { CarCategory } from "../../../interfaces/car-category";
import { EntityState } from "../../core/state.interfaces";

export interface CarFeatureState {
  new: EntityState<CarCategory>,
  edit: EntityState<string>,
  delete: EntityState<string>,
  carCategory: EntityState<{
    data: CarCategory,
    children: Category[]
  }>,
}