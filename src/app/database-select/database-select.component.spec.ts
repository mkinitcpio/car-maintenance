import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { Router } from '@angular/router';

import { DatabaseSelectComponent } from './database-select.component';
import { ElectronService } from '@core/services';
import { DataBaseService } from '@core/database';
import { SettingsService } from '@shared/components/settings/settings.service';
import {
  provideMockDataBaseService,
  provideMockElectronService,
  provideMockSettingsService,
} from 'testing/test-mocks';

describe('DatabaseSelectComponent', () => {
  let component: DatabaseSelectComponent;
  let fixture: ComponentFixture<DatabaseSelectComponent>;
  let electron: any;
  let database: any;
  let settings: any;
  let router: { navigate: jasmine.Spy };

  beforeEach(async () => {
    router = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      declarations: [DatabaseSelectComponent],
      providers: [
        provideMockElectronService(),
        provideMockDataBaseService(),
        provideMockSettingsService(),
        { provide: Router, useValue: router },
      ],
    })
      .overrideComponent(DatabaseSelectComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(DatabaseSelectComponent);
    component = fixture.componentInstance;
    electron = TestBed.inject(ElectronService);
    database = TestBed.inject(DataBaseService);
    settings = TestBed.inject(SettingsService);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('creates a new database file and navigates home on create', fakeAsync(() => {
    electron.dialog.showSaveDialog.and.returnValue(Promise.resolve({ filePath: '/tmp/new.json' }));

    component.onCreate();
    flushMicrotasks();

    expect(database.createDatabaseFile).toHaveBeenCalledWith('/tmp/new.json');
    expect(settings.setDataBasePath).toHaveBeenCalledWith('/tmp/new.json');
    expect(database.initDataBase).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

  it('opens an existing database and navigates home on open', fakeAsync(() => {
    electron.dialog.showOpenDialog.and.returnValue(Promise.resolve({ filePaths: ['/tmp/existing.json'] }));

    component.onOpen();
    flushMicrotasks();

    expect(settings.setDataBasePath).toHaveBeenCalledWith('/tmp/existing.json');
    expect(database.initDataBase).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  }));

  it('does nothing when the open dialog returns no file', fakeAsync(() => {
    electron.dialog.showOpenDialog.and.returnValue(Promise.resolve({ filePaths: [] }));

    component.onOpen();
    flushMicrotasks();

    expect(settings.setDataBasePath).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  }));
});
