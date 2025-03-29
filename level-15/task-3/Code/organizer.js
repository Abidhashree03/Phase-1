const fs = require("fs");
const path = require("path");

// Define file categories
const categories = {
    Images: [".jpg", ".jpeg", ".png", ".gif", ".bmp"],
    Documents: [".pdf", ".doc", ".docx", ".txt", ".xls", ".xlsx", ".ppt", ".pptx"],
    Videos: [".mp4", ".mkv", ".avi", ".mov"],
    Audio: [".mp3", ".wav", ".aac"],
    Archives: [".zip", ".rar", ".7z", ".tar", ".gz"],
    Code: [".js", ".java", ".py", ".cpp", ".html", ".css"],
    Others: []
};

// Function to get category based on file extension
function getCategory(extension) {
    for (const [category, extensions] of Object.entries(categories)) {
        if (extensions.includes(extension.toLowerCase())) {
            return category;
        }
    }
    return "Others"; // Default category
}

// **Asynchronous Version**
async function organizeFilesAsync(directory) {
    try {
        const files = await fs.promises.readdir(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.promises.stat(filePath);

            if (stat.isFile()) {
                const ext = path.extname(file);
                const category = getCategory(ext);
                const categoryPath = path.join(directory, category);

                // Create category folder if not exists
                if (!fs.existsSync(categoryPath)) {
                    await fs.promises.mkdir(categoryPath, { recursive: true });
                }

                // Move file to respective category
                const newFilePath = path.join(categoryPath, file);
                await fs.promises.rename(filePath, newFilePath);

                console.log(`✅ Moved: ${file} → ${category}/`);
            }
        }

        console.log("🎉 Organization complete!");

    } catch (error) {
        console.error("Error:", error);
    }
}

// **Synchronous Version**
function organizeFilesSync(directory) {
    try {
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isFile()) {
                const ext = path.extname(file);
                const category = getCategory(ext);
                const categoryPath = path.join(directory, category);

                // Create category folder if not exists
                if (!fs.existsSync(categoryPath)) {
                    fs.mkdirSync(categoryPath, { recursive: true });
                }

                // Move file to respective category
                const newFilePath = path.join(categoryPath, file);
                fs.renameSync(filePath, newFilePath);

                console.log(`✅ Moved: ${file} → ${category}/`);
            }
        }

        console.log("🎉 Organization complete!");

    } catch (error) {
        console.error("Error:", error);
    }
}

// **Watch Mode**: Automatically organizes new files added
function watchDirectory(directory) {
    console.log("👀 Watching for new files...");
    fs.watch(directory, (eventType, filename) => {
        if (eventType === "rename" && filename) {
            console.log(`📂 Detected new file: ${filename}`);
            setTimeout(() => organizeFilesAsync(directory), 2000); // Delay to allow file creation
        }
    });
}

// **CLI Handling**
const directory = process.argv[2];

if (!directory) {
    console.error("❌ Please provide a directory path.");
    process.exit(1);
}

if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
    console.error("❌ Invalid directory.");
    process.exit(1);  
}

// Run based on user choice
const mode = process.argv[3]; // Optional mode flag

if (mode === "sync") {
    console.log("⚡ Running in synchronous mode...");
    organizeFilesSync(directory);
} else if (mode === "watch") {
    console.log("🔍 Running in watch mode...");
    watchDirectory(directory);
} else {
    console.log("⚡ Running in asynchronous mode...");
    organizeFilesAsync(directory);
}
