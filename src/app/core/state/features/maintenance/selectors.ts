import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MaintenanceFeatureState } from './feature.interface';

const maintenanceFeatureState = createFeatureSelector<MaintenanceFeatureState>('maintenance');

const updateMaintenance = (state: MaintenanceFeatureState) => state.maintenance;

const getUpdatedMaintenance = createSelector(
  maintenanceFeatureState,
  updateMaintenance,
);

export const maintenanceSelectors = {
  getUpdatedMaintenance
};
