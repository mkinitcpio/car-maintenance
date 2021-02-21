import { state } from "@angular/animations";
import { Action, ActionReducer, createReducer, on, State } from "@ngrx/store";
import { FeatureState, Status } from "../../../state/interface";
import { initialState } from "../initial-state";
import { Category } from "../interface";
import { createCategory, createCategorySuccess, deleteCategory, deleteCategorySuccess, editCategory, editCategorySuccess, getCategories, getCategoriesSuccess } from "../actions";

const appReducer = createReducer(
  initialState,
  on(getCategories, state => ({
    ...state,
    entity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(getCategoriesSuccess, (state, { categories }) => ({
    ...state,
    entity: {
      status: Status.Success,
      value: categories,
      error: null,
    }
  })),
  on(createCategory, state => ({
    ...state,
    newEntity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(createCategorySuccess, (state, { category }) => ({
    ...state,
    newEntity: {
      status: Status.Success,
      value: category,
      error: null,
    }
  })),
  on(deleteCategory, state => ({
    ...state,
    deleteEntity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(deleteCategorySuccess, (state, { category }) => ({
    ...state,
    deleteEntity: {
      status: Status.Success,
      value: category,
      error: null,
    }
  })),
  on(editCategory, state => ({
    ...state,
    editEntity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(editCategorySuccess, (state, { category }) => ({
    ...state,
    editEntity: {
      status: Status.Success,
      value: category,
      error: null,
    }
  })),
);

export function navigationReducer(state: FeatureState<Array<Category>>, action: Action) {
  return appReducer(state, action);
}