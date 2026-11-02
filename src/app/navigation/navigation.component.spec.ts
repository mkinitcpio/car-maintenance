import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { of, Subject } from 'rxjs';

import { NavigationComponent } from './navigation.component';
import { NavigationFacade } from './state/navigation.facade';
import { DialogManagerService } from '../shared/services/dialog-manager.service';
import { DataBaseService } from '../core/database';
import { SettingsService } from '@shared/components/settings/settings.service';
import { SideNavigationTrackerService } from '../home/side-navigation-tracker.service';
import { GroupTreeService } from './categories-tree/group-tree.service';
import { Category, CategoryTypeEnum } from './state/interface';
import { createDataBaseServiceMock, createSettingsServiceMock } from 'testing/test-mocks';

function createNavigationFacadeMock(): any {
    return {
        categories$: new Subject(),
        newCategory$: new Subject(),
        editCategory$: new Subject(),
        deleteCategory$: new Subject(),
        newCarCategory$: new Subject(),
        deleteCarCategory$: new Subject(),
        editCarCategory$: new Subject(),
        carCategory$: new Subject(),
        loadCategories: vi.fn().mockName('loadCategories'),
        createNewCategory: vi.fn().mockName('createNewCategory'),
        deleteCategory: vi.fn().mockName('deleteCategory'),
        deleteCarCategory: vi.fn().mockName('deleteCarCategory'),
        editCategory: vi.fn().mockName('editCategory'),
        getCarCategory: vi.fn().mockName('getCarCategory'),
        editCarCategory: vi.fn().mockName('editCarCategory'),
        addCarCategory: vi.fn().mockName('addCarCategory'),
    };
}

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;
    let facade: any;
    let dialogManager: any;

    beforeEach(async () => {
        facade = createNavigationFacadeMock();
        dialogManager = {
            openCategoryDialog: vi.fn().mockName('openCategoryDialog').mockReturnValue(of({ id: 'c1' })),
            openCarDialog: vi.fn().mockName('openCarDialog').mockReturnValue(of({ id: 'car1' })),
            openDeleteCategoryDialog: vi.fn().mockName('openDeleteCategoryDialog').mockReturnValue(of(true)),
            openFeedbackDialog: vi.fn().mockName('openFeedbackDialog'),
        };

        await TestBed.configureTestingModule({
            imports: [NavigationComponent],
            providers: [
                { provide: NavigationFacade, useValue: facade },
                { provide: DialogManagerService, useValue: dialogManager },
                { provide: DataBaseService, useValue: createDataBaseServiceMock() },
                { provide: SettingsService, useValue: createSettingsServiceMock() },
                { provide: Router, useValue: { navigate: vi.fn().mockName('navigate') } },
                { provide: ActivatedRoute, useValue: {} },
                { provide: TranslateService, useValue: { get: () => of('groups') } },
                SideNavigationTrackerService,
                GroupTreeService,
            ],
        })
            .overrideComponent(NavigationComponent, { set: { template: '', imports: [] } })
            .compileComponents();

        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        component.categories.set([]);
        fixture.detectChanges();
    });

    it('creates', () => {
        expect(component).toBeTruthy();
    });

    it('loads categories on init', () => {
        expect(facade.loadCategories).toHaveBeenCalled();
    });

    it('creates a new category from the dialog result', () => {
        component.addCategory();
        expect(dialogManager.openCategoryDialog).toHaveBeenCalled();
        expect(facade.createNewCategory).toHaveBeenCalledWith({ id: 'c1' } as any);
    });

    it('adds a new car category from the dialog result', () => {
        component.addCarCategory();
        expect(facade.addCarCategory).toHaveBeenCalledWith({ id: 'car1' } as any);
    });

    it('opens the feedback dialog', () => {
        component.onFeedback();
        expect(dialogManager.openFeedbackDialog).toHaveBeenCalled();
    });

    describe('onDelete', () => {
        it('deletes a plain category', () => {
            const category: Category = { id: 'c1', name: 'Engine', parent: null, type: CategoryTypeEnum.Category };
            component.onDelete(category);
            expect(facade.deleteCategory).toHaveBeenCalledWith(category);
        });

        it('deletes a car category by id', () => {
            const car: Category = { id: 'car1', name: 'Car', parent: null, type: CategoryTypeEnum.Car };
            component.onDelete(car);
            expect(facade.deleteCarCategory).toHaveBeenCalledWith('car1');
        });
    });
});
