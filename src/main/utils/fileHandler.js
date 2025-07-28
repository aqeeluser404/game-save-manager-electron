import fs from 'fs/promises';
import path from 'path';

export async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return data;
  } catch (error) {
    throw new Error(`Failed to read file: ${filePath}`);
  }
}

export async function writeFile(filePath, data) {
  await fs.writeFile(filePath, data);
}

export async function readJsonFile(filePath) {
  const data = await readFile(filePath);
  return JSON.parse(data);
}

export async function writeJsonFile(filePath, data) {
  await writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function ensureFolderExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

export async function copyDirectoryIfNewer(source, target) {
  await ensureFolderExists(target);
  const items = await fs.readdir(source);
  let skippedCount = 0;

  for (const item of items) {
    const sourceItem = path.join(source, item);
    const targetItem = path.join(target, item);
    const stats = await fs.stat(sourceItem);

    if (stats.isDirectory()) {
      skippedCount += await copyDirectoryIfNewer(sourceItem, targetItem);
    } else {
      let targetExists = true;
      try {
        await fs.access(targetItem);
      } catch {
        targetExists = false;
      }

      const shouldCopy = !targetExists || 
        (await fs.stat(targetItem)).mtimeMs < stats.mtimeMs;

      if (shouldCopy) {
        await fs.copyFile(sourceItem, targetItem);
      } else {
        skippedCount++;
      }
    }
  }

  return skippedCount;
}