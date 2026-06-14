import { carCategoryReducer } from './reducers';
import { initialState } from './initial-state';
import * as CarCategoryActions from './actions';
import { Status } from '../../core/state.interfaces';
import { CarCategory, CarCategoryFormData } from '@core/interfaces/car-category';
import { CategoryTypeEnum } from 'app/navigation/state/interface';

const carCategory: CarCategory = {
  id: 'car-1',
  name: 'My Car',
  parent: null,
  type: CategoryTypeEnum.Car,
  vehicleId: 'vin',
  make: 'Toyota',
  model: 'Corolla',
  year: 2020,
  engine: '1.6',
};

const formData = { ...carCategory, parts: [] } as CarCategoryFormData;

describe('carCategoryReducer', () => {
  it('returns the initial state for an unknown action', () => {
    expect(carCategoryReducer(undefined, { type: 'init' } as any)).toEqual(initialState);
  });

  describe('create', () => {
    it('sets new -> Loading on createCarCategory', () => {
      const state = carCategoryReducer(
        initialState,
        CarCategoryActions.createCarCategory({ carCategoryFormData: formData }),
      );
      expect(state.new).toEqual({ status: Status.Loading, value: null, error: null });
    });

    it('sets new -> Success with the value on createCarCategorySuccess', () => {
      const state = carCategoryReducer(
        initialState,
        CarCategoryActions.createCarCategorySuccess({ carCategory }),
      );
      expect(state.new).toEqual({ status: Status.Success, value: carCategory, error: null });
    });
  });

  describe('edit', () => {
    it('sets edit -> Loading then Success', () => {
      const loading = carCategoryReducer(
        initialState,
        CarCategoryActions.editCarCategory({ carCategoryFormData: formData }),
      );
      expect(loading.edit.status).toBe(Status.Loading);

      const success = carCategoryReducer(
        loading,
        CarCategoryActions.editCarCategorySuccess({ carCategory }),
      );
      expect(success.edit).toEqual({ status: Status.Success, value: carCategory, error: null });
    });
  });

  describe('delete', () => {
    it('sets delete -> Loading then Success', () => {
      const loading = carCategoryReducer(
        initialState,
        CarCategoryActions.deleteCarCategory({ id: 'car-1' }),
      );
      expect(loading.delete.status).toBe(Status.Loading);

      const success = carCategoryReducer(
        loading,
        CarCategoryActions.deleteCarCategorySuccess({ carCategory }),
      );
      expect(success.delete.value).toBe(carCategory);
    });
  });

  describe('get', () => {
    it('sets carCategory -> Loading then Success', () => {
      const loading = carCategoryReducer(
        initialState,
        CarCategoryActions.getCarCategory({ id: 'car-1' }),
      );
      expect(loading.carCategory.status).toBe(Status.Loading);

      const payload = { data: carCategory, children: [] };
      const success = carCategoryReducer(
        loading,
        CarCategoryActions.getCarCategorySuccess({ carCategory: payload }),
      );
      expect(success.carCategory.value).toBe(payload);
    });
  });

  it('only touches the slice relevant to the action', () => {
    const state = carCategoryReducer(
      initialState,
      CarCategoryActions.createCarCategory({ carCategoryFormData: formData }),
    );

    expect(state.edit).toBe(initialState.edit);
    expect(state.delete).toBe(initialState.delete);
    expect(state.carCategory).toBe(initialState.carCategory);
  });
});
