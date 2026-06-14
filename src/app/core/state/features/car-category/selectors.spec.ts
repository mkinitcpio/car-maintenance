import { carCategoriesSelectors } from './selectors';
import { initialState } from './initial-state';
import { Status } from '../../core/state.interfaces';
import { CarFeatureState } from './feature.interface';

const featureState: CarFeatureState = {
  ...initialState,
  new: { status: Status.Success, value: { id: 'new' } as any, error: null },
  edit: { status: Status.Loading, value: null, error: null },
  delete: { status: Status.Error, value: null, error: 'boom' },
  carCategory: { status: Status.Success, value: { data: { id: 'c' } as any, children: [] }, error: null },
};

const rootState = { carCategory: featureState } as any;

describe('carCategoriesSelectors', () => {
  it('getNewCarCategory returns the new slice', () => {
    expect(carCategoriesSelectors.getNewCarCategory(rootState)).toBe(featureState.new);
  });

  it('getEditCarCategory returns the edit slice', () => {
    expect(carCategoriesSelectors.getEditCarCategory(rootState)).toBe(featureState.edit);
  });

  it('getDeleteCarCategory returns the delete slice', () => {
    expect(carCategoriesSelectors.getDeleteCarCategory(rootState)).toBe(featureState.delete);
  });

  it('getCarCategory returns the carCategory slice', () => {
    expect(carCategoriesSelectors.getCarCategory(rootState)).toBe(featureState.carCategory);
  });
});
