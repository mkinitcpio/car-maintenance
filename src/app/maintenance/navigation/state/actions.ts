import { createAction, props } from "@ngrx/store";
import { Category, CategoryTree } from "./interface";

export const getCategories = createAction('[Navigation] Get Categories');
export const getCategoriesSuccess = createAction(
  '[Navigation] Get Categories Success',
  props<{ categories: Array<CategoryTree> }>()
);

export const createCategory = createAction('[Navigation] Create Category', props<{ category: Category }>());
export const createCategorySuccess = createAction('[Navigation] Create Category Success', props<{ category: Category }>());

export const deleteCategory = createAction('[Navigation] Delete Category', props<{ category: Category }>());
export const deleteCategorySuccess = createAction('[Navigation] Delete Category Success', props<{ category: Category }>());

export const editCategory = createAction('[Navigation] Edit Category', props<{ category: Category }>());
export const editCategorySuccess = createAction('[Navigation] Edit Category Success', props<{ category: Category }>());