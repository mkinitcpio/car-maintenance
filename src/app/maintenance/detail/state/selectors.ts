import { createFeatureSelector, createSelector } from "@ngrx/store";

const navigationFeatureSelector = createFeatureSelector("details");

const details = (state) => state.entity;
const newRecord = (state) => state.newEntity;
const deleteRecord = (state) => state.deleteEntity;
const editRecord = (state) => state.editEntity;
const moveRecords = (state) => state.moveEntity;

export const getDetails = createSelector(navigationFeatureSelector, details);

export const getNewDetail = createSelector(
  navigationFeatureSelector,
  newRecord
);

export const getEditDetail = createSelector(
  navigationFeatureSelector,
  editRecord
);

export const getDeleteDetail = createSelector(
  navigationFeatureSelector,
  deleteRecord
);

export const getMoveRecords = createSelector(
  navigationFeatureSelector,
  moveRecords,
);
