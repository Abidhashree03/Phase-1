import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import dotenv from "dotenv";

dotenv.config();

const SOURCE_DIR = process.env.SOURCE_DIR || "./source";
const BACKUP_DIR = process.env.BACKUP_DIR || "./backups";
const MAX_BACKUPS = parseInt(process.env.MAX_BACKUPS, 10) || 5;
const ENABLE_COMPRESSION = process.env.ENABLE_COMPRESSION === "true";
const LOG_FILE = "backup.log";

// Ensure backup directory exists
const ensureDir = async (dir) => {
    try {
        await fs.mkdir(dir, { recursive: true });
    } catch (err) {
        logError(`Error creating directory ${dir}: ${err}`);
    }
};

// Log messages to a file
const logMessage = async (message) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    await fs.appendFile(LOG_FILE, logEntry, "utf8");
};

// Log errors
const logError = async (error) => {
    console.error(error);
    await logMessage(`ERROR: ${error}`);
};

// Get timestamped backup folder name
const getTimestamp = () => {
    return new Date().toISOString().replace(/[:.]/g, "-");
};

// Perform backup operation
const backupFiles = async () => {
    try {
        await ensureDir(BACKUP_DIR);

        const timestamp = getTimestamp();
        const backupPath = path.join(BACKUP_DIR, `backup-${timestamp}`);

        if (ENABLE_COMPRESSION) {
            const zipPath = `${backupPath}.zip`;
            exec(`tar -czf ${zipPath} -C ${SOURCE_DIR} .`, async (err) => {
                if (err) {
                    await logError(`Compression failed: ${err}`);
                } else {
                    await logMessage(`Backup created at: ${zipPath}`);
                }
            });
        } else {
            await fs.cp(SOURCE_DIR, backupPath, { recursive: true });
            await logMessage(`Backup created at: ${backupPath}`);
        }

        await removeOldBackups();
    } catch (error) {
        await logError(`Backup failed: ${error}`);
    }
};

// Remove old backups
const removeOldBackups = async () => {
    try {
        const files = await fs.readdir(BACKUP_DIR);
        const backups = files.filter(file => file.startsWith("backup-")).sort();

        while (backups.length > MAX_BACKUPS) {
            const oldestBackup = backups.shift();
            await fs.rm(path.join(BACKUP_DIR, oldestBackup), { recursive: true, force: true });
            await logMessage(`Deleted old backup: ${oldestBackup}`);
        }
    } catch (error) {
        await logError(`Error removing old backups: ${error}`);
    }
};

// Run one-time backup
const runBackup = async () => {
    console.log("Starting backup...");
    await backupFiles();
    console.log("Backup completed.");
};

// Schedule backups
const scheduleBackup = (intervalMinutes) => {
    console.log(`Scheduled backups every ${intervalMinutes} minutes.`);
    setInterval(runBackup, intervalMinutes * 60 * 1000);
};

// Run if script is executed directly
if (process.argv.includes("--run")) {
    runBackup();
} else if (process.argv.includes("--schedule")) {
    const interval = parseInt(process.argv[process.argv.indexOf("--schedule") + 1], 10) || 60;
    scheduleBackup(interval);
}
