const fs = require("fs");
const path = require("path");

const dirPath = "new_folder"; // Current directory

fs.readdir(dirPath, (err, files) => {
    if (err) {
        console.error(`Error reading directory: ${err.message}`);
        return;
    }

    console.log(`Contents of directory '${dirPath}':`);
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            console.log(`[DIR]  ${file}`);
        } else {
            console.log(`[FILE] ${file}`);
        }
    });
});
