import { Injectable } from '@angular/core';

import { ipcRenderer, webFrame, dialog, shell } from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as Store from 'electron-store';
import { Settings } from '@shared/components/settings/interface';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private Store: Store;
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  os: typeof os;
  dialog: typeof dialog;
  shell: typeof shell;
  path: typeof path;
  systemPreferences: typeof remote.systemPreferences;
  appSettings: Store<Settings>;
  private _changelog: Store<{
    version: string,
    isShown: boolean,
  }>;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.os = window.require('os');
      this.dialog = window.require('@electron/remote').dialog;
      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
      this.path = window.require('path');
      this.shell = window.require('electron').shell;
      this.remote = window.require('@electron/remote');
      this.systemPreferences= window.require('@electron/remote').systemPreferences;
      this.Store = window.require('electron-store');

      const Store = window.require('electron-store');
      this.appSettings = new Store({
        name: 'appSettings',
      });

      this._changelog = new Store({
        name: 'changelog',
        defaults: {
          version: '',
          isShown: false,
        },
      });
    }
  }

  public combineAppConfigsPath(...path: Array<string>): string {
    return this.path.join(...path);
  }

  public getAppConfigFolderPath(): string {
    const osAppDataFolder = '.config';
    return this.path.join(this.os.homedir(), osAppDataFolder, 'Учет');
  }

  public isFileExist(filePath: string): boolean {
    return this.fs.existsSync(filePath);
  }

  public setAppSettingsData(data: Settings): void {
    this.appSettings.store = data;
  }

  public setChangelogData(data): void {
    this._changelog.store = data;
  }

  public get changelog() {
    return this._changelog.store;
  }
}
