import { of } from 'rxjs';

import { CarCategoryEffects } from './effects';
import * as CarCategoryActions from './actions';
import { CarCategory, CarCategoryFormData } from '@core/interfaces/car-category';
import { CategoryTypeEnum } from 'app/navigation/state/interface';
import { createDataBaseServiceMock } from 'testing/test-mocks';

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

const formData: CarCategoryFormData = { ...carCategory, parts: ['Engine', 'Brakes'] };

describe('CarCategoryEffects', () => {
    let database: any;

    beforeEach(() => {
        database = createDataBaseServiceMock();
    });

    const effectsFor = (action: any) => new CarCategoryEffects(of(action) as any, database);

    it('createCarCategory$ builds sub-categories from parts and saves the car', async () => {
        database.saveNewCarCategory.mockReturnValue(of(carCategory));

        effectsFor(CarCategoryActions.createCarCategory({ carCategoryFormData: formData })).createCarCategory$.subscribe((result) => {
            const [savedCar, subCategories, maintenance] = vi.mocked(database.saveNewCarCategory).mock.lastCall;

            expect(savedCar.parts).toBeUndefined(); // parts are split out
            expect(subCategories.length).toBe(2);
            expect(subCategories.map((c: any) => c.name)).toEqual(['Engine', 'Brakes']);
            expect(subCategories[0].parent).toBe('car-1');
            expect(maintenance.parent).toBe('car-1');
            expect(maintenance.completedParts).toEqual([]);
            expect(result).toEqual(CarCategoryActions.createCarCategorySuccess({ carCategory }));
            ;
        });
    });

    it('getCarCategory$ reads the car and emits success', async () => {
        const payload = { data: carCategory, children: [] };
        database.getCarCategory.mockReturnValue(of(payload));

        effectsFor(CarCategoryActions.getCarCategory({ id: 'car-1' })).getCarCategory$.subscribe((result) => {
            expect(database.getCarCategory).toHaveBeenCalledWith('car-1');
            expect(result).toEqual(CarCategoryActions.getCarCategorySuccess({ carCategory: payload }));
            ;
        });
    });

    it('deleteCarCategory$ deletes by id and emits success', async () => {
        database.deleteCarCategory.mockReturnValue(of(carCategory));

        effectsFor(CarCategoryActions.deleteCarCategory({ id: 'car-1' })).deleteCarCategory$.subscribe((result) => {
            expect(database.deleteCarCategory).toHaveBeenCalledWith('car-1');
            expect(result).toEqual(CarCategoryActions.deleteCarCategorySuccess({ carCategory }));
            ;
        });
    });

    it('editCarCategory$ strips parts before editing and emits success', async () => {
        database.editCarCategory.mockReturnValue(of(carCategory));

        effectsFor(CarCategoryActions.editCarCategory({ carCategoryFormData: formData })).editCarCategory$.subscribe((result) => {
            const [edited] = vi.mocked(database.editCarCategory).mock.lastCall;
            expect(edited.parts).toBeUndefined();
            expect(result).toEqual(CarCategoryActions.editCarCategorySuccess({ carCategory }));
            ;
        });
    });
});
