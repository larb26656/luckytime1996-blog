import { Command } from "commander";
import sharp from "sharp";
import fs from "fs";
import path from "path";

const BACKUP_DIR = ".backup";
const MAX_WIDTH = 800;
const QUALITY = 60;
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

function generateBackupFolderName(): string {
  const now = new Date();
  const pad = (n: number, len = 2) => n.toString().padStart(len, "0");

  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
    pad(now.getMilliseconds(), 3),
  ].join("-");
}

function createBackupDir(): string {
  const backupDir = generateBackupFolderName();
  const backupPath = path.join(BACKUP_DIR, backupDir);

  if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
  }

  return backupPath;
}

function backupFile(filePath: string, backupDir: string): string {
  const fileName = path.basename(filePath);
  const backupPath = path.join(backupDir, fileName);

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log(`🗂️  Backed up to ${backupPath}`);
  } else {
    console.log(`⚠️  Backup already exists: ${backupPath}`);
  }

  return backupPath;
}

type SharpProcessor = (img: sharp.Sharp) => sharp.Sharp;

function optimizeResolution(): SharpProcessor {
  return (img) => img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
}

function optimizeQuality(ext: string): SharpProcessor {
  return (img) => {
    if (ext === ".jpg" || ext === ".jpeg") {
      return img.jpeg({ quality: QUALITY });
    } else if (ext === ".webp") {
      return img.webp({ quality: QUALITY });
    } else if (ext === ".png") {
      return img.png({ quality: QUALITY });
    }

    return img;
  };
}

async function optimize(filePath: string, backupDir: string) {
  try {
    const backupPath = backupFile(filePath, backupDir);
    const ext = path.extname(filePath).toLowerCase();
    const img = sharp(backupPath);
    const result = optimizeQuality(ext)(optimizeResolution()(img));
    await result.toFile(filePath);

    console.log(`✅ Optimized image to ${filePath}`);
  } catch (err) {
    console.error("❌ Error processing image:", err);
    process.exit(1);
  }
}

async function optimizeFile(filePath: string) {
  if (!ALLOWED_EXTENSIONS.includes(path.extname(filePath).toLowerCase())) {
    console.error("❌ Unsupported file type");
    process.exit(1);
  }

  const backupDir = createBackupDir();
  await optimize(filePath, backupDir);
}

async function optimizeFolder(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  const backupDir = createBackupDir();
  const allowFiles = files.filter((file) =>
    ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase())
  );

  for (const file of allowFiles) {
    const fullPath = path.join(dirPath, file);
    const fileStat = fs.statSync(fullPath);
    if (fileStat.isFile()) {
      await optimize(fullPath, backupDir);
    }
  }
}

async function handleResizeImage(payload: string) {
  if (!fs.existsSync(payload)) {
    console.error("❌ Input path not found");
    process.exit(1);
  }

  const stat = fs.statSync(payload);

  if (stat.isFile()) {
    console.log("📄 File detected");

    await optimizeFile(payload);
  } else if (stat.isDirectory()) {
    console.log("📁 Directory detected");

    await optimizeFolder(payload);
  } else {
    console.error("❌ Unsupported file type");
    process.exit(1);
  }
}

async function bootstrap() {
  const program = new Command();

  program
    .name("optimize-image")
    .argument("<payload>", "Path to file or directory")
    .action(handleResizeImage);

  program.parse(process.argv);
}

bootstrap();
