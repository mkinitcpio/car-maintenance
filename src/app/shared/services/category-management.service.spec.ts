import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import type { Mock } from 'vitest';

import { CarCategory } from '@core/interfaces/car-category';
import { Status } from '../../state/interface';
import { Category, CategoryTree, CategoryTypeEnum } from '../../maintenance/navigation/state/interface';
import { NavigationFacade } from '../../maintenance/navigation/state/navigation.facade';
import { FormModeEnum } from '../../maintenance/dialogs/create-dialog/form-mode.enum';
import { DialogManagerService } from './dialog-manager.service';
import { CategoryManagementService } from './category-management.service';

describe('CategoryManagementService', () => {
  let service: CategoryManagementService;

  const updatedCategory: Category = {
    id: 'child',
    name: 'Updated child',
    parent: 'parent',
    illustration: 'engine',
    type: CategoryTypeEnum.Category,
  };

  const updatedCar: CarCategory = {
    id: 'car',
    name: 'Updated car',
    parent: null,
    illustration: 'car',
    type: CategoryTypeEnum.Car,
    vehicleId: '1',
    make: 'Make',
    model: 'Model',
    year: 2020,
    engine: '1.6',
  };

  let facade: any;
  let dialogManager: any;
  let translateService: { get: Mock };

  function createFacadeMock(): any {
    return {
      categories$: of({ status: Status.Success, value: [], error: null }),
      carCategory$: of({ status: Status.Init, value: null, error: null }),
      editCategory: vi.fn().mockName('editCategory'),
      deleteCategory: vi.fn().mockName('deleteCategory'),
      deleteCarCategory: vi.fn().mockName('deleteCarCategory'),
      getCarCategory: vi.fn().mockName('getCarCategory'),
      editCarCategory: vi.fn().mockName('editCarCategory'),
    };
  }

  function createDialogManagerMock(): any {
    return {
      openCategoryDialog: vi.fn().mockName('openCategoryDialog').mockReturnValue(of(updatedCategory)),
      openCarDialog: vi.fn().mockName('openCarDialog').mockReturnValue(of(updatedCar)),
      openDeleteCategoryDialog: vi.fn().mockName('openDeleteCategoryDialog').mockReturnValue(of(true)),
    };
  }

  beforeEach(() => {
    facade = createFacadeMock();
    dialogManager = createDialogManagerMock();
    translateService = { get: vi.fn().mockName('get').mockReturnValue(of('groups')) };

    TestBed.configureTestingModule({
      providers: [
        CategoryManagementService,
        { provide: NavigationFacade, useValue: facade },
        { provide: DialogManagerService, useValue: dialogManager },
        { provide: TranslateService, useValue: translateService },
      ],
    });

    service = TestBed.inject(CategoryManagementService);
  });

  describe('editCategory', () => {
    it('opens the category dialog with parent options and the flattened form data', () => {
      const parent: CategoryTree = {
        id: 'parent',
        name: 'Parent',
        type: CategoryTypeEnum.Category,
        children: [{
          id: 'child',
          name: 'Child',
          parent: 'parent',
          illustration: 'engine',
          type: CategoryTypeEnum.Category,
        }],
      };
      facade.categories$ = of({ status: Status.Success, value: [parent], error: null });

      service.editCategory(parent.children[0]);

      expect(dialogManager.openCategoryDialog).toHaveBeenCalledWith({
        mode: FormModeEnum.Edit,
        parents: [{ name: 'Parent', value: 'parent' }],
        formData: {
          id: 'child',
          name: 'Child',
          parent: 'parent',
          illustration: 'engine',
          type: CategoryTypeEnum.Category,
        },
      });
      expect(facade.editCategory).toHaveBeenCalledWith(updatedCategory);
    });

    it('reads the car and opens the car dialog with its parts', () => {
      const car: CarCategory = { ...updatedCar, name: 'Car' };
      const part: Category = {
        id: 'engine',
        name: 'Engine',
        parent: 'car',
        type: CategoryTypeEnum.Category,
      };
      facade.carCategory$ = of({
        status: Status.Success,
        value: { data: car, children: [part] },
        error: null,
      });

      service.editCategory(car);

      expect(facade.getCarCategory).toHaveBeenCalledWith('car');
      expect(dialogManager.openCarDialog).toHaveBeenCalledWith({
        mode: FormModeEnum.Edit,
        formData: { ...car, parts: [part] },
      });
      expect(facade.editCarCategory).toHaveBeenCalledWith(updatedCar);
    });
  });

  describe('deleteCategory', () => {
    it('deletes a plain category after confirmation', () => {
      const category: Category = {
        id: 'child',
        name: 'Child',
        parent: 'parent',
        type: CategoryTypeEnum.Category,
      };

      service.deleteCategory(category);

      expect(translateService.get).toHaveBeenCalledWith('DIALOG.DELETE.DECLESIONS.GROUPS');
      expect(dialogManager.openDeleteCategoryDialog).toHaveBeenCalledWith({ name: 'groups' });
      expect(facade.deleteCategory).toHaveBeenCalledWith(category);
    });

    it('deletes a car category by id after confirmation', () => {
      service.deleteCategory(updatedCar);

      expect(facade.deleteCarCategory).toHaveBeenCalledWith('car');
    });
  });
});
