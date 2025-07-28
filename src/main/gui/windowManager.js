import path from 'path';
import chokidar from 'chokidar';
import { PATHS } from '../utils/paths';

export function createAppWindow() {

    const window = new BrowserWindow({
        width: 800, height: 600,
        title: 'Save Manager', icon: path.join('assets', 'icon.ico'),
        webPreferences: {
            preload: PATHS.PRELOAD_SCRIPT,
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    const loadApp = () => {
        const indexPath = PATHS.INDEX;
        window.loadFile(indexPath).catch(console.error);
    };

    return { window, loadApp };
}

export function setupLiveReload(window) {
  if (process.env.NODE_ENV !== 'development') return null;

  const watcher = chokidar.watch([
    PATHS.FRONTEND,
    PATHS.BACKEND
  ], {
    ignored: /node_modules/,
    ignoreInitial: true
  });

  watcher.on('change', () => {
    console.log('Reloading due to file change...');
    window.reload();
  });

  return watcher;
}