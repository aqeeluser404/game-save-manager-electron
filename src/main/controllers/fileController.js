import fs from 'fs';
// import os from 'os';
// import path from 'path';
// import { addGameEntry, readConfig } from '../services/configService.js';
// import { vaultHasData, uploadToVault, downloadSave } from '../services/fileService.js';
import { PATHS } from '../utils/paths.js';

export class FileController {

    // Helpers

    resolveSavePath(originalPath, selectedUsername) {
        return originalPath.replace(/C:\\Users\\[^\\]+\\/i, `C:\\Users\\${selectedUsername}\\`);
    }
    getConfig() {
        const data = fs.readFileSync(PATHS.GAME_CONFIG, 'utf-8');
        return JSON.parse(data);
    }
    
    // Handlers


}