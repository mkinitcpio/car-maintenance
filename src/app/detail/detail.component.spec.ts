import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, Subject } from 'rxjs';

import { DetailComponent } from './detail.component';
import { DetailsFacade } from './state/details.facade';
import { SettingsService } from '@shared/components/settings/settings.service';
import { DialogManagerService } from '@shared/services/dialog-manager.service';
import { GroupTreeService } from 'app/navigation/categories-tree/group-tree.service';
import { NavigationFacade } from 'app/navigation/state/navigation.facade';
import { ElectronService } from '@core/services';
import { ExportService } from '@shared/services/export.service';
import { UtilsService } from '@shared/services/utils.service';
import { createElectronServiceMock, createSettingsServiceMock } from 'testing/test-mocks';

function createDetailsFacadeMock(): any {
  return {
    details$: new Subject(),
    newDetails$: new Subject(),
    editDetail$: new Subject(),
    deleteDetail$: new Subject(),
    moveRecords$: new Subject(),
    loadRecords: jasmine.createSpy('loadRecords'),
    createNewRecord: jasmine.createSpy('createNewRecord'),
    editRecord: jasmine.createSpy('editRecord'),
    deleteRecord: jasmine.createSpy('deleteRecord'),
    moveRecords: jasmine.createSpy('moveRecords'),
  };
}

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let facade: any;
  let settings: any;
  let groupTreeService: GroupTreeService;

  beforeEach(async () => {
    facade = createDetailsFacadeMock();
    settings = createSettingsServiceMock();

    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        { provide: DetailsFacade, useValue: facade },
        { provide: SettingsService, useValue: settings },
        {
          provide: DialogManagerService,
          useValue: {
            openRecordDialog: () => of(null),
            openDeleteRecordDialog: () => of(true),
            openPrintDialog: () => of(null),
            openMoveDialog: () => of(null),
          },
        },
        { provide: NavigationFacade, useValue: { categories$: new Subject() } },
        { provide: ElectronService, useValue: createElectronServiceMock() },
        { provide: ExportService, useValue: { toCSV: () => of({ status: 'Cancel' }), toPDF: () => of({ status: 'Cancel' }) } },
        { provide: UtilsService, useValue: {
          getResultCost: jasmine.createSpy('getResultCost').and.returnValue(0),
          getLastDate: jasmine.createSpy('getLastDate').and.returnValue(null),
          getDeclensionWord: () => of('records'),
        } },
        { provide: MatSnackBar, useValue: { open: () => ({ onAction: () => of(null) }) } },
        { provide: TranslateService, useValue: { get: () => of('text') } },
        { provide: ActivatedRoute, useValue: { params: of({ parentId: 'p', id: 'i', name: 'Engine' }) } },
        GroupTreeService,
      ],
    })
      .overrideComponent(DetailComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    groupTreeService = TestBed.inject(GroupTreeService);
    fixture.detectChanges();
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('loads records for the route id on init', () => {
    expect(facade.loadRecords).toHaveBeenCalledWith('i');
  });

  it('selects the parent group when navigating up', () => {
    component.navigateToParentGroup('parent-1');

    expect(groupTreeService.getSelectedItem()).toEqual({
      routeName: 'category-details',
      group: { id: 'parent-1' },
    });
  });

  it('persists hidden columns when column visibility changes', () => {
    component.onColumnVisibilityChanged(['cost']);
    expect(settings.setVisibleColumnsForDetailsTable).toHaveBeenCalledWith(['cost']);
  });

  it('marks hidden columns as not visible', () => {
    settings.getDetailsHiddenVisibleColumns.and.returnValue(['cost']);

    const result = component.updateVisibilityOfColumns([
      { key: 'cost', name: '', type: '', order: 1, visible: true },
      { key: 'name', name: '', type: '', order: 2, visible: true },
    ]);

    expect(result.find((s) => s.key === 'cost').visible).toBe(false);
    expect(result.find((s) => s.key === 'name').visible).toBe(true);
  });
});
