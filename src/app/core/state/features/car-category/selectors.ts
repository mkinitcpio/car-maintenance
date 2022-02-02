import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CarFeatureState } from './feature.interface';

const carFeatureState = createFeatureSelector<CarFeatureState>('carCategory');

const newCarCategory = (state: CarFeatureState) => state.new;
const deleteCarCategory = (state: CarFeatureState) => state.delete;
const editCarCategory = (state: CarFeatureState) => state.edit;
const carCategory = (state: CarFeatureState) => state.carCategory;

const getNewCarCategory = createSelector(
  carFeatureState,
  newCarCategory,
);

const getDeleteCarCategory = createSelector(
  carFeatureState,
  deleteCarCategory,
);

const getEditCarCategory = createSelector(
  carFeatureState,
  editCarCategory,
);

const getCarCategory = createSelector(
  carFeatureState,
  carCategory,
);

export const carCategoriesSelectors = {
  getCarCategory,
  getNewCarCategory,
  getEditCarCategory,
  getDeleteCarCategory,
};
