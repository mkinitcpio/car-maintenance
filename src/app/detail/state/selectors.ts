import { createFeatureSelector, createSelector } from "@ngrx/store";

const navigationFeatureSelector = createFeatureSelector("details");

const details = (state) => state.entity;
const newRecord = (state) => state.newEntity;
const deleteRecord = (state) => state.deleteEntity;
const editRecord = (state) => state.editEntity;

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

const a = {
  parent: "bdcd3266-b6b2-428e-80ef-8e3ab5020864",
  id: "1",
  name: "record 1",
  cost: 123,
  date: "10/10/2020",
};

const b = {
  categories: [
    { id: "bdcd3266-b6b2-428e-80ef-8e3ab5020864", name: "test", parent: null },
  ],
  records: [
    {
      parent: "bdcd3266-b6b2-428e-80ef-8e3ab5020864",
      id: "1",
      name: "record 1",
      cost: "123",
      date: "10/10/2020",
    },
  ],
  filePath: "",
};
