import { Injectable } from '@angular/core';

import { ipcRenderer, webFrame, dialog, shell } from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as os from 'os';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  os: typeof os;
  dialog: typeof dialog;
  shell: typeof shell;

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
      this.shell = window.require('electron').shell;
    }
  }
}
