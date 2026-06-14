/**
 * Reusable testing doubles.
 *
 * The real `ElectronService` constructor reaches into `@electron/remote`, which
 * performs a *synchronous* IPC round-trip to the main process. That call is not
 * available in the karma test process, so it blocks for ~30s and then throws.
 * Every spec that (directly or transitively) needs `ElectronService` must use
 * the mock below instead of letting the real service be constructed.
 */
import { Provider } from '@angular/core';
import { BehaviorSubject, Subject, of } from 'rxjs';

import { ElectronService } from '@core/services';
import { NotificationService } from '@core/services/notification.service';
import { SettingsService } from '@shared/components/settings/settings.service';
import { DataBaseService } from '@core/database';
import { Settings } from '@shared/components/settings/interface';
import { defaultSettings } from '@shared/components/settings/default-settings';
import { SettingsTypeEnum } from '@shared/components/settings/settings-type.enum';

/** A fake `electron.Notification` that records what was shown. */
export class FakeNotification {
  static instances: FakeNotification[] = [];
  static get last(): FakeNotification | undefined {
    return FakeNotification.instances[FakeNotification.instances.length - 1];
  }
  static reset(): void {
    FakeNotification.instances = [];
  }

  public readonly title: string;
  public readonly body: string;
  public readonly show = jasmine.createSpy('Notification.show');

  constructor(options: { title: string; body: string }) {
    this.title = options?.title;
    this.body = options?.body;
    FakeNotification.instances.push(this);
  }
}

/** Minimal in-memory stand-in for an `electron-store` instance. */
export function createElectronStoreMock(initial: Record<string, any> = {}): any {
  let data: Record<string, any> = { ...initial };

  return {
    get store(): any {
      return data;
    },
    set store(value: any) {
      data = value;
    },
    get size(): number {
      return Object.keys(data).length;
    },
    get: jasmine
      .createSpy('store.get')
      .and.callFake((key: string, fallback?: any) => (key in data ? data[key] : fallback)),
    set: jasmine.createSpy('store.set').and.callFake((key: string, value: any) => {
      data[key] = value;
    }),
  };
}

// The real ElectronService has private members (Store, _changelog); a structural
// double can never satisfy that nominal shape, so the doubles are typed loosely.
export type ElectronServiceMock = any;

/** Build a fully fledged `ElectronService` double with no real IPC. */
export function createElectronServiceMock(settings: Settings = defaultSettings): ElectronServiceMock {
  FakeNotification.reset();

  return {
    isElectron: true,
    ipcRenderer: {
      on: jasmine.createSpy('ipcRenderer.on'),
      send: jasmine.createSpy('ipcRenderer.send'),
      invoke: jasmine.createSpy('ipcRenderer.invoke').and.returnValue(Promise.resolve()),
    },
    webFrame: {},
    remote: {
      Notification: FakeNotification,
      BrowserWindow: class FakeBrowserWindow {},
      systemPreferences: {},
      app: { getPath: jasmine.createSpy('app.getPath').and.returnValue('/home/test') },
    },
    systemPreferences: {},
    childProcess: {},
    fs: {
      existsSync: jasmine.createSpy('fs.existsSync').and.returnValue(false),
      readFileSync: jasmine.createSpy('fs.readFileSync').and.returnValue('{}'),
      writeFileSync: jasmine.createSpy('fs.writeFileSync'),
      writeFile: jasmine
        .createSpy('fs.writeFile')
        .and.callFake((_path: string, _data: any, _opts: any, cb?: () => void) => cb && cb()),
      promises: {
        writeFile: jasmine.createSpy('fs.promises.writeFile').and.returnValue(Promise.resolve()),
      },
    },
    os: { homedir: jasmine.createSpy('os.homedir').and.returnValue('/home/test') },
    dialog: {
      showSaveDialog: jasmine
        .createSpy('dialog.showSaveDialog')
        .and.returnValue(Promise.resolve({ canceled: false, filePath: '/tmp/db.json' })),
      showOpenDialog: jasmine
        .createSpy('dialog.showOpenDialog')
        .and.returnValue(Promise.resolve({ canceled: false, filePaths: ['/tmp/db.json'] })),
    },
    shell: {
      openPath: jasmine.createSpy('shell.openPath').and.returnValue(Promise.resolve('')),
      openExternal: jasmine.createSpy('shell.openExternal').and.returnValue(Promise.resolve()),
    },
    path: { join: (...parts: string[]) => parts.join('/') },
    appSettings: createElectronStoreMock({ ...settings }),
    combineAppConfigsPath: jasmine
      .createSpy('combineAppConfigsPath')
      .and.callFake((...parts: string[]) => parts.join('/')),
    getAppConfigFolderPath: jasmine
      .createSpy('getAppConfigFolderPath')
      .and.returnValue('/home/test/.config/Учет'),
    isFileExist: jasmine.createSpy('isFileExist').and.returnValue(false),
    setAppSettingsData: jasmine.createSpy('setAppSettingsData'),
    setChangelogData: jasmine.createSpy('setChangelogData'),
    changelog: { version: '', isShown: false },
  };
}

export function provideMockElectronService(settings?: Settings): Provider {
  return { provide: ElectronService, useValue: createElectronServiceMock(settings) };
}

/** A `SettingsService` double exposing the members components read most often. */
export function createSettingsServiceMock(settings: Settings = defaultSettings): any {
  return {
    settings,
    store: createElectronStoreMock(settings as any),
    selected: null,
    settingsChanged$: new BehaviorSubject<{ type: SettingsTypeEnum; value?: any }>({
      type: SettingsTypeEnum.All,
    }),
    animationsStateChanged$: new Subject<boolean>(),
    init: jasmine.createSpy('init'),
    setAppLanguage: jasmine.createSpy('setAppLanguage'),
    setAnimations: jasmine.createSpy('setAnimations'),
    setRegion: jasmine.createSpy('setRegion'),
    setDataBasePath: jasmine.createSpy('setDataBasePath'),
    setStartPage: jasmine.createSpy('setStartPage'),
    setMetricSystem: jasmine.createSpy('setMetricSystem'),
    setCurrency: jasmine.createSpy('setCurrency'),
    setFirstTab: jasmine.createSpy('setFirstTab'),
    setAppearance: jasmine.createSpy('setAppearance'),
    changeThemeColor: jasmine.createSpy('changeThemeColor'),
    setVisibleColumnsForDetailsTable: jasmine.createSpy('setVisibleColumnsForDetailsTable'),
    getDetailsHiddenVisibleColumns: jasmine
      .createSpy('getDetailsHiddenVisibleColumns')
      .and.returnValue([]),
  };
}

export function provideMockSettingsService(settings?: Settings): Provider {
  return { provide: SettingsService, useValue: createSettingsServiceMock(settings) };
}

export function createNotificationServiceMock(): any {
  return { show: jasmine.createSpy('NotificationService.show') };
}

export function provideMockNotificationService(): Provider {
  return { provide: NotificationService, useValue: createNotificationServiceMock() };
}

/** A `DataBaseService` double with empty data and spy mutators. */
export function createDataBaseServiceMock(): any {
  return {
    databaseError$: new Subject<void>(),
    dbExist$: new BehaviorSubject<boolean>(false),
    getCategories: jasmine.createSpy('getCategories').and.returnValue([]),
    getRecords: jasmine.createSpy('getRecords').and.returnValue([]),
    getLabels: jasmine.createSpy('getLabels').and.returnValue([]),
    getCategoryDetails: jasmine.createSpy('getCategoryDetails').and.returnValue(null),
    saveNewCategory: jasmine.createSpy('saveNewCategory'),
    saveNewRecord: jasmine.createSpy('saveNewRecord'),
    deleteCategory: jasmine.createSpy('deleteCategory'),
    deleteRecord: jasmine.createSpy('deleteRecord'),
    editCategory: jasmine.createSpy('editCategory'),
    editRecord: jasmine.createSpy('editRecord'),
    createDatabaseFile: jasmine.createSpy('createDatabaseFile'),
    initDataBase: jasmine.createSpy('initDataBase'),
    // Methods used by the NgRx effects return observables.
    moveRecords: jasmine.createSpy('moveRecords').and.returnValue(of('parent')),
    updateMaintenance: jasmine.createSpy('updateMaintenance').and.returnValue(of(null)),
    saveNewCarCategory: jasmine.createSpy('saveNewCarCategory').and.returnValue(of(null)),
    getCarCategory: jasmine.createSpy('getCarCategory').and.returnValue(of({ data: null, children: [] })),
    deleteCarCategory: jasmine.createSpy('deleteCarCategory').and.returnValue(of(null)),
    editCarCategory: jasmine.createSpy('editCarCategory').and.returnValue(of(null)),
  };
}

export function provideMockDataBaseService(): Provider {
  return { provide: DataBaseService, useValue: createDataBaseServiceMock() };
}
