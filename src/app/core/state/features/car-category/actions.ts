import { createAction, props } from "@ngrx/store";
import { Category } from "app/navigation/state/interface";
import { CarCategory, CarCategoryFormData } from "../../../interfaces/car-category";

export const createCarCategory = createAction('[Core] Create Car Category', props<{ carCategoryFormData: CarCategoryFormData }>());
export const createCarCategorySuccess = createAction('[Core] Create Car Category Success', props<{ carCategory: CarCategory }>());

export const getCarCategory = createAction('[Core] Get Car Category', props<{ id: string }>());
export const getCarCategorySuccess = createAction('[Core] Get Car Category Success', props<{ carCategory: {
  data: CarCategory,
  children: Category[],
} }>());

export const deleteCarCategory = createAction('[Core] Delete Car Category', props<{ id: string }>());
export const deleteCarCategorySuccess = createAction('[Core] Delete Car Category Success', props<{ id: string }>());

export const editCarCategory = createAction('[Navigation] Edit Car Category', props<{ carCategoryFormData: CarCategoryFormData }>());
export const editCarCategorySuccess = createAction('[Navigation] Edit Car Category Success', props<{ id: string }>());