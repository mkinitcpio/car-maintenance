import { createAction, props } from "@ngrx/store";
import { CategoryDetails } from "./interface";

export const getCategoryDetails = createAction('[Category Details] Get Category Details', props<{ id: string }>());
export const getCategoryDetailsSuccess = createAction(
  '[Category Details] Get Category Details Success',
  props<{ categoryDetails: CategoryDetails }>()
);