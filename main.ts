import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import { initialize, enable as enableRemote } from "@electron/remote/main";
import * as Store from 'electron-store';
initialize();
Store.initRenderer();

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  win = new BrowserWindow({
    width: 1280,
    height: 720,
    title: `Car Maintenance`,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      allowRunningInsecureContent: (serve) ? true : false,
      contextIsolation: false,// true if you want to run 2e2 test  with Spectron or use remote module in renderer context (ie. Angular)
    },
  });

  enableRemote(win.webContents);

  win.setMenu(null);
  if (serve) {

    win.webContents.openDevTools();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true,
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();

    }

    if (process.platform === 'linux') {
      app.disableHardwareAcceleration();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
