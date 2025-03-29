const fs = require("fs");
const path = require("path");

function readDirectoryRecursive(dir) {
    try {
        const items = fs.readdirSync(dir); 

        items.forEach((item) => {
            const fullPath = path.join(dir, item); 
            const stats = fs.statSync(fullPath); 
            if (stats.isDirectory()) {
                console.log(`[DIR]  ${fullPath}`);
                readDirectoryRecursive(fullPath); 
            } else {
                console.log(`[FILE] ${fullPath}`);
            }
        });
    } catch (err) {
        console.error(`Error reading directory '${dir}':`, err.message);
    }
}

const directoryToRead = "new_folder";

if (!fs.existsSync(directoryToRead)) {
    console.error(`Directory '${directoryToRead}' does not exist.`);
    process.exit(1);
}

console.log(`Reading directory recursively: '${directoryToRead}'`);
readDirectoryRecursive(directoryToRead);
