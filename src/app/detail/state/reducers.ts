import { Action, createReducer, on } from "@ngrx/store";
import { FeatureState, Status } from "../../state/interface";
import { initialState } from "./initial-state";
import { Record } from "./interface";
import { getRecords, getRecordsSuccess, createRecord, createRecordsSuccess, editRecord, editRecordSuccess, deleteRecord, deleteRecordSuccess } from './actions';

const appReducer = createReducer(initialState,
  on(getRecords, state => ({
    ...state,
    entity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(getRecordsSuccess, (state, { records }) => ({
    ...state,
    entity: {
      status: Status.Success,
      value: records,
      error: null,
    }
  })),
  on(createRecord, (state) => ({
    ...state,
    newEntity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(createRecordsSuccess, (state) => ({
    ...state,
    newEntity: {
      status: Status.Success,
      value: null,
      error: null,
    }
  })),
  on(deleteRecord, (state) => ({
    ...state,
    deleteEntity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(deleteRecordSuccess, (state, { id }) => ({
    ...state,
    deleteEntity: {
      status: Status.Success,
      value: id,
      error: null,
    }
  })),
  on(editRecord, (state) => ({
    ...state,
    editEntity: {
      status: Status.Loading,
      value: null,
      error: null,
    }
  })),
  on(editRecordSuccess, (state) => ({
    ...state,
    editEntity: {
      status: Status.Success,
      value: null,
      error: null,
    },
  })),
);

export function detailsReducer(state: FeatureState<Array<Record>>, action: Action) {
  return appReducer(state, action);
}