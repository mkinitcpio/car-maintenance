import { of } from 'rxjs';

import { NavigationEffects } from './effects';
import * as NavigationActions from './actions';
import { Category, CategoryTypeEnum } from './interface';
import { createDataBaseServiceMock } from 'testing/test-mocks';

const category: Category = { id: '1', name: 'Engine', parent: null, type: CategoryTypeEnum.Category };

describe('NavigationEffects', () => {
  let database: any;

  beforeEach(() => {
    database = createDataBaseServiceMock();
  });

  const effectsFor = (action: any) => new NavigationEffects(of(action) as any, database);

  it('getCategories$ maps the flat categories into a tree', (done) => {
    database.getCategories.and.returnValue([
      { id: '1', name: 'Engine', parent: null, type: CategoryTypeEnum.Category },
      { id: '2', name: 'Oil', parent: '1', type: CategoryTypeEnum.Category },
    ]);

    effectsFor(NavigationActions.getCategories()).getCategories$.subscribe((result: any) => {
      expect(result.type).toBe(NavigationActions.getCategoriesSuccess.type);
      expect(result.categories.length).toBe(1);
      expect(result.categories[0].children[0].id).toBe('2');
      done();
    });
  });

  it('newCategory$ saves and signals success', (done) => {
    effectsFor(NavigationActions.createCategory({ category })).newCategory$.subscribe((result) => {
      expect(database.saveNewCategory).toHaveBeenCalledWith(category);
      expect(result).toEqual(NavigationActions.createCategorySuccess({ category }));
      done();
    });
  });

  it('deleteCategory$ deletes by id and echoes the category', (done) => {
    effectsFor(NavigationActions.deleteCategory({ category })).deleteCategory$.subscribe((result) => {
      expect(database.deleteCategory).toHaveBeenCalledWith('1');
      expect(result).toEqual(NavigationActions.deleteCategorySuccess({ category }));
      done();
    });
  });

  it('editCategory$ edits and signals success', (done) => {
    effectsFor(NavigationActions.editCategory({ category })).editCategory$.subscribe((result) => {
      expect(database.editCategory).toHaveBeenCalledWith(category);
      expect(result).toEqual(NavigationActions.editCategorySuccess({ category }));
      done();
    });
  });
});
