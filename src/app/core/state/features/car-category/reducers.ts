import { Action, createReducer, on } from "@ngrx/store";
import { initialState } from "./initial-state";
import * as CarCategoryActions  from './actions';
import { Status } from "../../core/state.interfaces";
import { CarFeatureState } from "./feature.interface";

const carCategoryReducers = createReducer(
  initialState,
  on(CarCategoryActions.createCarCategory, state => ({
    ...state,
    new: {
      status: Status.Loading,
      value: null,
      error: null,
    },
  })),
  on(CarCategoryActions.createCarCategorySuccess, (state, { carCategory }) => ({
    ...state,
    new: {
      status: Status.Success,
      value: carCategory,
      error: null,
    },
  })),

  on(CarCategoryActions.editCarCategory, state => ({
    ...state,
    edit: {
      status: Status.Loading,
      value: null,
      error: null,
    },
  })),
  on(CarCategoryActions.editCarCategorySuccess, (state, { carCategory }) => ({
    ...state,
    edit: {
      status: Status.Success,
      value: carCategory,
      error: null,
    },
  })),

  on(CarCategoryActions.deleteCarCategory, (state) => ({
    ...state,
    delete: {
      status: Status.Loading,
      value: null,
      error: null,
    },
  })),
  on(CarCategoryActions.deleteCarCategorySuccess, (state, { carCategory }) => ({
    ...state,
    delete: {
      status: Status.Success,
      value: carCategory,
      error: null,
    },
  })),

  on(CarCategoryActions.getCarCategory, (state) => ({
    ...state,
    carCategory: {
      status: Status.Loading,
      value: null,
      error: null,
    },
  })),
  on(CarCategoryActions.getCarCategorySuccess, (state, { carCategory }) => ({
    ...state,
    carCategory: {
      status: Status.Success,
      value: carCategory,
      error: null,
    },
  })),
);

export function carCategoryReducer(state: CarFeatureState, action: Action) {
  return carCategoryReducers(state, action);
}