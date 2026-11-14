import { createFeatureSelector, createSelector } from "@ngrx/store";

const categoryDetailsSelector = createFeatureSelector("categoryDetails");

const categoryDetails = (state) => state.categoryDetails;

export const getCategoryDetails = createSelector(
  categoryDetailsSelector,
  categoryDetails
);
