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

    it('getCategories$ maps the flat categories into a tree', async () => {
        database.getCategories.mockReturnValue([
            { id: '1', name: 'Engine', parent: null, type: CategoryTypeEnum.Category },
            { id: '2', name: 'Oil', parent: '1', type: CategoryTypeEnum.Category },
        ]);

        effectsFor(NavigationActions.getCategories()).getCategories$.subscribe((result: any) => {
            expect(result.type).toBe(NavigationActions.getCategoriesSuccess.type);
            expect(result.categories.length).toBe(1);
            expect(result.categories[0].children[0].id).toBe('2');
            ;
        });
    });

    it('newCategory$ saves and signals success', async () => {
        effectsFor(NavigationActions.createCategory({ category })).newCategory$.subscribe((result) => {
            expect(database.saveNewCategory).toHaveBeenCalledWith(category);
            expect(result).toEqual(NavigationActions.createCategorySuccess({ category }));
            ;
        });
    });

    it('deleteCategory$ deletes by id and echoes the category', async () => {
        effectsFor(NavigationActions.deleteCategory({ category })).deleteCategory$.subscribe((result) => {
            expect(database.deleteCategory).toHaveBeenCalledWith('1');
            expect(result).toEqual(NavigationActions.deleteCategorySuccess({ category }));
            ;
        });
    });

    it('editCategory$ edits and signals success', async () => {
        effectsFor(NavigationActions.editCategory({ category })).editCategory$.subscribe((result) => {
            expect(database.editCategory).toHaveBeenCalledWith(category);
            expect(result).toEqual(NavigationActions.editCategorySuccess({ category }));
            ;
        });
    });
});
