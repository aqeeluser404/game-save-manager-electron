import { PATHS } from '../utils/paths.js';
import { ensureFolderExists, copyDirectoryIfNewer } from '../utils/fileHandler.js'

// ─── Services ──────────────────────────────────────────────────────────

export async function vaultHasData(gameName) {
  try {
    const vaultPath = PATHS.VAULT.getGamePath(gameName);
    const items = await fs.readdir(vaultPath);
    return items.length > 0;
  } catch {
    return false;
  }
}

export async function uploadToVault(gameName, sourcePath) {
  const vaultPath = PATHS.VAULT.getGamePath(gameName);

  try {
    await ensureFolderExists(vaultPath);
    const skipped = await copyDirectoryIfNewer(sourcePath, vaultPath);

    if (skipped > 0) {
      return `${gameName} already up to date (${skipped} file(s) skipped)`;
    }
    return `${gameName} saved to vault`;
  } catch (err) {
    return `Sync failed for ${gameName}: ${err.message}`;
  }
}

export async function downloadSave(gameName, destinationPath) {
  try {
    const vaultPath = PATHS.VAULT.getGamePath(gameName);
    await copyDirectoryIfNewer(vaultPath, destinationPath);
    return `Restored ${gameName} from vault`;
  } catch (err) {
    return `Restore failed for ${gameName}: ${err.message}`;
  }
}