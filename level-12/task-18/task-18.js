const fs = require("fs");
const path = require("path");

// Function to synchronize directories
function syncDirectories(sourceDir, targetDir) {
    try {
        // Ensure the target directory exists
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
            console.log(`Created target directory: ${targetDir}`);
        }

        // Get list of files and directories in source and target
        const sourceFiles = new Set(fs.readdirSync(sourceDir));
        const targetFiles = new Set(fs.readdirSync(targetDir));

        // Copy new or modified files from source to target
        sourceFiles.forEach(file => {
            const sourceFilePath = path.join(sourceDir, file);
            const targetFilePath = path.join(targetDir, file);
            const sourceStat = fs.statSync(sourceFilePath);

            if (sourceStat.isDirectory()) {
                // Recursively sync subdirectories
                syncDirectories(sourceFilePath, targetFilePath);
            } else {
                if (!fs.existsSync(targetFilePath) || fs.statSync(targetFilePath).mtimeMs < sourceStat.mtimeMs) {
                    fs.copyFileSync(sourceFilePath, targetFilePath);
                    console.log(`Copied/Updated: ${file}`);
                }
            }
        });

        // Delete files in target that do not exist in source
        targetFiles.forEach(file => {
            const targetFilePath = path.join(targetDir, file);
            if (!sourceFiles.has(file)) {
                fs.rmSync(targetFilePath, { recursive: true, force: true });
                console.log(`Deleted: ${file}`);
            }
        });

        console.log("Synchronization complete!");
    } catch (error) {
        console.error("Error syncing directories:", error);
    }
}

// Define source and target directories (Modify these paths as needed)
const sourceDirectory = path.join(__dirname, "source");
const targetDirectory = path.join(__dirname, "target");

// Run directory synchronization
syncDirectories(sourceDirectory, targetDirectory);
