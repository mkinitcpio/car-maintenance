import { createFeatureSelector, createSelector } from '@ngrx/store';

const navigationFeatureSelector = createFeatureSelector('navigation');

const categories = (state) => state.entity;
const newCategory = (state) => state.newEntity;
const deleteCategory = (state) => state.deleteEntity;
const editCategory = (state) => state.editEntity;

export const getCategories = createSelector(
  navigationFeatureSelector,
  categories,
);

export const getNewCategory = createSelector(
  navigationFeatureSelector,
  newCategory,
);

export const getDeleteCategory = createSelector(
  navigationFeatureSelector,
  deleteCategory,
);

export const getEditCategory = createSelector(
  navigationFeatureSelector,
  editCategory,
);