import fs from "fs/promises";
import path from "path";

const MAX_SIZE_KB = 500;
const ASSET_DIRS = ["public", "src/assets"]; // ปรับตามโปรเจกต์

async function checkAssetSizes() {
  let hasError = false;

  async function checkFile(filePath: string) {
    const stats = await fs.stat(filePath);
    const sizeKB = stats.size / 1024;
    if (sizeKB > MAX_SIZE_KB) {
      console.error(
        `${filePath} is ${sizeKB.toFixed(1)} KB (> ${MAX_SIZE_KB} KB)`
      );
      hasError = true;
    }
  }

  async function walkDir(dir: string) {
    let entries;
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (entry.isFile()) {
        await checkFile(fullPath);
      }
    }
  }

  for (const dir of ASSET_DIRS) {
    await walkDir(dir);
  }

  if (hasError) {
    process.exit(1);
  } else {
    console.log("All asset files are under size limit.");
  }
}

checkAssetSizes();
