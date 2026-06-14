import { of } from 'rxjs';

import { CategoryDetailsEffects } from './effects';
import * as CategoryDetailsActions from './actions';
import { createDataBaseServiceMock } from 'testing/test-mocks';

describe('CategoryDetailsEffects', () => {
  let database: any;

  beforeEach(() => {
    database = createDataBaseServiceMock();
  });

  it('reads the category details and emits the success action', (done) => {
    const categoryDetails = { data: { id: 'c1' }, icon: null, type: 0, maintenance: null, tables: [] } as any;
    database.getCategoryDetails.and.returnValue(categoryDetails);

    const effects = new CategoryDetailsEffects(
      of(CategoryDetailsActions.getCategoryDetails({ id: 'c1' })) as any,
      database,
    );

    effects.getCategoryDetails$.subscribe((result) => {
      expect(database.getCategoryDetails).toHaveBeenCalledWith('c1');
      expect(result).toEqual(CategoryDetailsActions.getCategoryDetailsSuccess({ categoryDetails }));
      done();
    });
  });
});
