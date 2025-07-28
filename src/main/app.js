import { app, BrowserWindow } from 'electron';
import { FileController } from './controllers/fileController.js';
import { createAppWindow, setupLiveReload } from './windowManager.js';

let mainWindow;
let watcher;

function initializeApp() {
  const { window, loadApp } = createAppWindow();
  mainWindow = window;
  
  // Initialize controller (automatically sets up IPC)
  new FileController(mainWindow);
  
  loadApp();
  
  if (process.env.NODE_ENV === 'development') {
    watcher = setupLiveReload(mainWindow);
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  initializeApp();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) initializeApp();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('will-quit', () => {
  watcher?.close();
});