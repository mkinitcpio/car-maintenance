import { Action, createReducer, on } from "@ngrx/store";
import { FeatureState } from "./interface";
import { initialState } from "./initial-state";
import { getCategoryDetails, getCategoryDetailsSuccess } from './actions';
import { CategoryDetails } from "./interface";
import { Status } from "../../state/interface";

const appReducer = createReducer(initialState,
  on(getCategoryDetails, state => ({
    ...state,
    categoryDetails: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(getCategoryDetailsSuccess, (state, { categoryDetails }) => ({
    ...state,
    categoryDetails: {
      status: Status.Success,
      value: categoryDetails,
      error: null,
    }
  }),
));

export function categoryDetailsReducer(state: FeatureState<CategoryDetails>, action: Action) {
  return appReducer(state, action);
}