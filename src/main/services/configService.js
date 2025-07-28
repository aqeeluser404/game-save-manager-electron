import { readJsonFile, writeJsonFile } from "../utils/fileHandler";
import { PATHS } from "../utils/paths";

// ─── Services ──────────────────────────────────────────────────────────

export async function readConfig() {
    try {
        return await readJsonFile(PATHS.GAME_CONFIG);
    } catch {
        return [];
    }
}

export async function addGameEntry(name, savePath) {
  const config = await readConfig();
  config.push({ name, savePath });
  await writeJsonFile(PATHS.GAME_CONFIG, config);
}