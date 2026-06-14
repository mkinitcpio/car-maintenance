import { getCategories, getNewCategory, getDeleteCategory, getEditCategory } from './selectors';
import { Status } from '../../state/interface';

const navigation = {
  entity: { status: Status.Success, value: [{ id: '1' }], error: null },
  newEntity: { status: Status.Loading, value: null, error: null },
  deleteEntity: { status: Status.Init, value: null, error: null },
  editEntity: { status: Status.Error, value: null, error: 'boom' },
};

const rootState = { navigation } as any;

describe('navigation selectors', () => {
  it('getCategories returns the entity slice', () => {
    expect(getCategories(rootState)).toBe(navigation.entity);
  });

  it('getNewCategory returns the newEntity slice', () => {
    expect(getNewCategory(rootState)).toBe(navigation.newEntity);
  });

  it('getDeleteCategory returns the deleteEntity slice', () => {
    expect(getDeleteCategory(rootState)).toBe(navigation.deleteEntity);
  });

  it('getEditCategory returns the editEntity slice', () => {
    expect(getEditCategory(rootState)).toBe(navigation.editEntity);
  });
});
