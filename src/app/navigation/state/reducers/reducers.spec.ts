import { navigationReducer } from './index';
import { initialState } from '../initial-state';
import {
  getCategories,
  getCategoriesSuccess,
  createCategory,
  createCategorySuccess,
  deleteCategory,
  deleteCategorySuccess,
  editCategory,
  editCategorySuccess,
} from '../actions';
import { Status } from '../../../state/interface';
import { Category, CategoryTree, CategoryTypeEnum } from '../interface';

const category: Category = { id: '1', name: 'Engine', parent: null, type: CategoryTypeEnum.Category };
const categories: CategoryTree[] = [{ id: '1', name: 'Engine', type: CategoryTypeEnum.Category, children: [] }];

// The app types `initialState` with `CategoryTree[]` but the reducer signature
// with `Category[]`; alias loosely so the spec can chain reduced states freely.
const reduce = navigationReducer as unknown as (state: any, action: any) => any;

describe('navigationReducer', () => {
  it('returns the initial state for an unknown action', () => {
    expect(reduce(undefined, { type: 'init' } as any)).toEqual(initialState);
  });

  describe('load', () => {
    it('sets entity -> Loading on getCategories', () => {
      const state = reduce(initialState, getCategories());
      expect(state.entity).toEqual({ status: Status.Loading, value: null, error: null });
    });

    it('stores categories with Success on getCategoriesSuccess', () => {
      const state = reduce(initialState, getCategoriesSuccess({ categories }));
      expect(state.entity).toEqual({ status: Status.Success, value: categories as any, error: null });
    });
  });

  describe('create', () => {
    it('sets newEntity Loading -> Success', () => {
      const loading = reduce(initialState, createCategory({ category }));
      expect(loading.newEntity.status).toBe(Status.Loading);

      const success = reduce(loading, createCategorySuccess({ category }));
      expect(success.newEntity.value as any).toBe(category);
    });
  });

  describe('delete', () => {
    it('sets deleteEntity Loading -> Success', () => {
      const loading = reduce(initialState, deleteCategory({ category }));
      expect(loading.deleteEntity.status).toBe(Status.Loading);

      const success = reduce(loading, deleteCategorySuccess({ category }));
      expect(success.deleteEntity.value as any).toBe(category);
    });
  });

  describe('edit', () => {
    it('sets editEntity Loading -> Success', () => {
      const loading = reduce(initialState, editCategory({ category }));
      expect(loading.editEntity.status).toBe(Status.Loading);

      const success = reduce(loading, editCategorySuccess({ category }));
      expect(success.editEntity.value as any).toBe(category);
    });
  });

  it('leaves untouched slices referentially equal', () => {
    const state = reduce(initialState, getCategories());
    expect(state.newEntity).toBe(initialState.newEntity);
    expect(state.editEntity).toBe(initialState.editEntity);
    expect(state.deleteEntity).toBe(initialState.deleteEntity);
  });
});
