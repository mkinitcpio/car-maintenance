import { Action, createReducer, on } from "@ngrx/store";
import { initialState } from "./initial-state";
import * as MaintenanceActions  from './actions';
import { Status } from "../../core/state.interfaces";
import { MaintenanceFeatureState } from "./feature.interface";

const maintenanceReducers = createReducer(
  initialState,
  on(MaintenanceActions.updateMaintenance, state => ({
    ...state,
    maintenance: {
      status: Status.Loading,
      value: null,
      error: null,
    },
  })),
  on(MaintenanceActions.updateMaintenanceSuccess, (state, { maintenance }) => ({
    ...state,
    maintenance: {
      status: Status.Success,
      value: maintenance,
      error: null,
    },
  })),
);

export function maintenanceReducer(state: MaintenanceFeatureState, action: Action) {
  return maintenanceReducers(state, action);
}