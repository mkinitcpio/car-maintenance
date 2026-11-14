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
import { Category, CategoryTree, CategoryTypeEnum } from './state/interface';
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

    describe('search', () => {
        const categories: CategoryTree[] = [
            {
                id: 'engine',
                name: 'Engine',
                type: CategoryTypeEnum.Category,
                children: [
                    { id: 'oil-filter', name: 'Oil filter', type: CategoryTypeEnum.Category },
                    { id: 'air-filter', name: 'Air filter', type: CategoryTypeEnum.Category },
                ],
            },
            {
                id: 'brakes',
                name: 'Brakes',
                type: CategoryTypeEnum.Category,
                children: [
                    { id: 'oil', name: 'Oil', type: CategoryTypeEnum.Category },
                ],
            },
            {
                id: 'car',
                name: 'Car',
                type: CategoryTypeEnum.Car,
                children: [],
            },
        ];

        beforeEach(() => {
            component.categories.set(categories);
        });

        it('keeps groups whose children match the query', () => {
            component.onSearchChange('oil');

            const filtered = component.filteredCategories();

            expect(filtered.map((category) => category.id)).toEqual(['engine', 'brakes']);
            expect(filtered[0].children.map((child) => child.id)).toEqual(['oil-filter']);
            expect(filtered[1].children.map((child) => child.id)).toEqual(['oil']);
        });

        it('keeps all children when the group name matches', () => {
            component.onSearchChange('engine');

            const filtered = component.filteredCategories();

            expect(filtered.map((category) => category.id)).toEqual(['engine']);
            expect(filtered[0].children.map((child) => child.id)).toEqual(['oil-filter', 'air-filter']);
        });

        it('matches car categories as well', () => {
            component.onSearchChange('car');

            expect(component.filteredCategories().map((category) => category.id)).toEqual(['car']);
        });

        it('reports no results when nothing matches the query', () => {
            component.onSearchChange('unknown');

            expect(component.hasSearchResults()).toBe(false);
        });

        it('checks the results of the active tab only', () => {
            component.onSearchChange('oil');

            expect(component.hasSearchResults()).toBe(true);

            component.selectedTabIndex = 1;
            expect(component.hasSearchResults()).toBe(false);
        });

        it('enables the group-tree search mode when the query is not empty', () => {
            const groupTreeService = TestBed.inject(GroupTreeService);
            const spy = vi.spyOn(groupTreeService, 'setSearchActive');

            component.onSearchChange('oil');
            expect(spy).toHaveBeenCalledWith(true);

            component.onSearchChange('   ');
            expect(spy).toHaveBeenLastCalledWith(false);
        });

        it('resets the query and the tree state when the search is closed', () => {
            const groupTreeService = TestBed.inject(GroupTreeService);
            const spy = vi.spyOn(groupTreeService, 'setSearchActive');

            component.openSearch();
            component.onSearchChange('oil');
            component.closeSearch();

            expect(component.searchOpen()).toBe(false);
            expect(component.searchQuery()).toBe('');
            expect(component.filteredCategories()).toEqual(categories);
            expect(spy).toHaveBeenCalledWith(false);
        });
    });
});
