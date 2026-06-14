import { ElectronService } from './electron.service';

/**
 * The real service reaches into Electron through `window.require(...)`. We stub
 * `window.require` only for the duration of construction so the constructor wires
 * up our fakes instead of performing real (synchronous) IPC.
 */
describe('ElectronService', () => {
  let service: ElectronService;
  let storeInstances: Array<{ name: string }>;

  beforeEach(() => {
    storeInstances = [];

    class FakeStore {
      constructor(options: { name: string }) {
        storeInstances.push(options);
      }
    }

    const fakes: Record<string, any> = {
      electron: { ipcRenderer: { id: 'ipc' }, webFrame: { id: 'frame' }, shell: { id: 'shell' } },
      '@electron/remote': { dialog: { id: 'dialog' }, systemPreferences: { id: 'prefs' } },
      os: { homedir: () => '/home/test' },
      child_process: { id: 'cp' },
      fs: { existsSync: (path: string) => path === '/exists' },
      path: { join: (...parts: string[]) => parts.join('/') },
      'electron-store': FakeStore,
    };

    const originalRequire = (window as any).require;
    (window as any).require = (moduleName: string) => fakes[moduleName];
    try {
      service = new ElectronService();
    } finally {
      (window as any).require = originalRequire;
    }
  });

  it('detects that it runs inside electron', () => {
    expect(service.isElectron).toBe(true);
  });

  it('wires up the electron modules from window.require', () => {
    expect(service.ipcRenderer as any).toEqual({ id: 'ipc' });
    expect(service.dialog as any).toEqual({ id: 'dialog' });
    expect(service.shell as any).toEqual({ id: 'shell' });
  });

  it('creates the app-settings and changelog stores', () => {
    expect(storeInstances.map((s) => s.name)).toEqual(['appSettings', 'changelog']);
  });

  it('joins config paths', () => {
    expect(service.combineAppConfigsPath('a', 'b', 'c')).toBe('a/b/c');
  });

  it('builds the app config folder path from the home directory', () => {
    expect(service.getAppConfigFolderPath()).toBe('/home/test/.config/Учет');
  });

  it('checks file existence through fs', () => {
    expect(service.isFileExist('/exists')).toBe(true);
    expect(service.isFileExist('/missing')).toBe(false);
  });
});
