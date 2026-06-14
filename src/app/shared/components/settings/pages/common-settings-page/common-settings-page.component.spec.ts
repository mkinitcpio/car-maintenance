import { ComponentFixture, TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';

import { CommonSettingsPageComponent } from './common-settings-page.component';
import { SettingsService } from '../../settings.service';
import { ElectronService } from '@core/services';
import { DataBaseService } from '@core/database';
import { NavigationEnum } from 'app/home/navigation-bar/navigation.enum';
import {
  provideMockDataBaseService,
  provideMockElectronService,
  provideMockSettingsService,
} from 'testing/test-mocks';

describe('CommonSettingsPageComponent', () => {
  let component: CommonSettingsPageComponent;
  let fixture: ComponentFixture<CommonSettingsPageComponent>;
  let settings: any;
  let electron: any;
  let database: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonSettingsPageComponent],
      providers: [provideMockSettingsService(), provideMockElectronService(), provideMockDataBaseService()],
    })
      .overrideComponent(CommonSettingsPageComponent, { set: { template: '' } })
      .compileComponents();

    fixture = TestBed.createComponent(CommonSettingsPageComponent);
    component = fixture.componentInstance;
    settings = TestBed.inject(SettingsService);
    electron = TestBed.inject(ElectronService);
    database = TestBed.inject(DataBaseService);
  });

  it('creates', () => {
    expect(component).toBeTruthy();
  });

  it('persists the chosen start page', () => {
    component.onStartPageChanged(NavigationEnum.Dashboard);
    expect(settings.setStartPage).toHaveBeenCalledWith(NavigationEnum.Dashboard);
  });

  it('switches the database file and re-initialises it', fakeAsync(() => {
    electron.dialog.showOpenDialog.and.returnValue(Promise.resolve({ filePaths: ['/tmp/other.json'] }));

    component.onDatabaseChange();
    flushMicrotasks();

    expect(settings.setDataBasePath).toHaveBeenCalledWith('/tmp/other.json');
    expect(database.initDataBase).toHaveBeenCalled();
  }));

  it('does nothing when no database file is chosen', fakeAsync(() => {
    electron.dialog.showOpenDialog.and.returnValue(Promise.resolve({ filePaths: [] }));

    component.onDatabaseChange();
    flushMicrotasks();

    expect(database.initDataBase).not.toHaveBeenCalled();
  }));
});
