/**
 * Reusable testing doubles.
 *
 * The real `ElectronService` constructor reaches into `@electron/remote`, which
 * performs a *synchronous* IPC round-trip to the main process. That call is not
 * available in the karma test process, so it blocks for ~30s and then throws.
 * Every spec that (directly or transitively) needs `ElectronService` must use
 * the mock below instead of letting the real service be constructed.
 */
import { Provider, computed } from '@angular/core';
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
  public readonly show = vi.fn();

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
    get: vi.fn().mockImplementation((key: string, fallback?: any) => (key in data ? data[key] : fallback)),
    set: vi.fn().mockImplementation((key: string, value: any) => {
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
      on: vi.fn(),
      send: vi.fn(),
      invoke: vi.fn().mockReturnValue(Promise.resolve()),
    },
    webFrame: {},
    remote: {
      Notification: FakeNotification,
      BrowserWindow: class FakeBrowserWindow {},
      systemPreferences: {},
      app: { getPath: vi.fn().mockReturnValue('/home/test') },
    },
    systemPreferences: {},
    childProcess: {},
    fs: {
      existsSync: vi.fn().mockReturnValue(false),
      readFileSync: vi.fn().mockReturnValue('{}'),
      writeFileSync: vi.fn(),
      writeFile: vi.fn().mockImplementation((_path: string, _data: any, _opts: any, cb?: () => void) => cb && cb()),
      promises: {
        writeFile: vi.fn().mockReturnValue(Promise.resolve()),
      },
    },
    os: { homedir: vi.fn().mockReturnValue('/home/test') },
    dialog: {
      showSaveDialog: vi.fn().mockReturnValue(Promise.resolve({ canceled: false, filePath: '/tmp/db.json' })),
      showOpenDialog: vi.fn().mockReturnValue(Promise.resolve({ canceled: false, filePaths: ['/tmp/db.json'] })),
    },
    shell: {
      openPath: vi.fn().mockReturnValue(Promise.resolve('')),
      openExternal: vi.fn().mockReturnValue(Promise.resolve()),
    },
    path: { join: (...parts: string[]) => parts.join('/') },
    appSettings: createElectronStoreMock({ ...settings }),
    combineAppConfigsPath: vi.fn().mockImplementation((...parts: string[]) => parts.join('/')),
    getAppConfigFolderPath: vi.fn().mockReturnValue('/home/test/.config/Учет'),
    isFileExist: vi.fn().mockReturnValue(false),
    setAppSettingsData: vi.fn(),
    setChangelogData: vi.fn(),
    changelog: { version: '', isShown: false },
  };
}

export function provideMockElectronService(settings?: Settings): Provider {
  return { provide: ElectronService, useValue: createElectronServiceMock(settings) };
}

/** A `SettingsService` double exposing the members components read most often. */
export function createSettingsServiceMock(settings: Settings = defaultSettings): any {
  const settingsSignal = computed<Settings>(() => ({ ...settings }));

  return {
    settings,
    settingsSignal,
    language: computed(() => settingsSignal().language),
    region: computed(() => settingsSignal().region),
    units: computed(() => settingsSignal().units),
    appearance: computed(() => settingsSignal().appearance),
    store: createElectronStoreMock(settings as any),
    selected: null,
    settingsChanged$: new BehaviorSubject<{ type: SettingsTypeEnum; value?: any }>({
      type: SettingsTypeEnum.All,
    }),
    animationsStateChanged$: new Subject<boolean>(),
    init: vi.fn(),
    setAppLanguage: vi.fn(),
    setAnimations: vi.fn(),
    setRegion: vi.fn(),
    setDataBasePath: vi.fn(),
    setStartPage: vi.fn(),
    setMetricSystem: vi.fn(),
    setCurrency: vi.fn(),
    setFirstTab: vi.fn(),
    setAppearance: vi.fn(),
    changeThemeColor: vi.fn(),
    setVisibleColumnsForDetailsTable: vi.fn(),
    getDetailsHiddenVisibleColumns: vi.fn().mockReturnValue([]),
  };
}

export function provideMockSettingsService(settings?: Settings): Provider {
  return { provide: SettingsService, useValue: createSettingsServiceMock(settings) };
}

export function createNotificationServiceMock(): any {
  return { show: vi.fn() };
}

export function provideMockNotificationService(): Provider {
  return { provide: NotificationService, useValue: createNotificationServiceMock() };
}

/** A `DataBaseService` double with empty data and spy mutators. */
export function createDataBaseServiceMock(): any {
  return {
    databaseError$: new Subject<void>(),
    dbExist$: new BehaviorSubject<boolean>(false),
    getCategories: vi.fn().mockReturnValue([]),
    getRecords: vi.fn().mockReturnValue([]),
    getLabels: vi.fn().mockReturnValue([]),
    getCategoryDetails: vi.fn().mockReturnValue(null),
    saveNewCategory: vi.fn(),
    saveNewRecord: vi.fn(),
    deleteCategory: vi.fn(),
    deleteRecord: vi.fn(),
    editCategory: vi.fn(),
    editRecord: vi.fn(),
    createDatabaseFile: vi.fn(),
    initDataBase: vi.fn(),
    // Methods used by the NgRx effects return observables.
    moveRecords: vi.fn().mockReturnValue(of('parent')),
    updateMaintenance: vi.fn().mockReturnValue(of(null)),
    saveNewCarCategory: vi.fn().mockReturnValue(of(null)),
    getCarCategory: vi.fn().mockReturnValue(of({ data: null, children: [] })),
    deleteCarCategory: vi.fn().mockReturnValue(of(null)),
    editCarCategory: vi.fn().mockReturnValue(of(null)),
  };
}

export function provideMockDataBaseService(): Provider {
  return { provide: DataBaseService, useValue: createDataBaseServiceMock() };
}
