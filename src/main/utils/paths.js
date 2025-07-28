import path from 'path';
import { fileURLToPath } from 'url';

// Base directory resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.join(__dirname, '..', '..', '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');

export const PATHS = {

    // base directories
    ROOT: PROJECT_ROOT,
    SRC: SRC_DIR,

    // backend 
    BACKEND: path.join(SRC_DIR, 'main'),
    
    // app files
    GAME_CONFIG: path.join(BACKEND, 'config', 'gameDirectories.json'),

    // frontend
    FRONTEND: path.join(SRC_DIR, 'frontend'),
    INDEX: path.join(SRC_DIR, 'frontend', 'index.html'),

    PRELOAD_SCRIPT: path.join(FRONTEND, 'boot', 'preload.js')
}
