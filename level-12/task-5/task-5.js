const fs = require("fs");


const fileName = "sample.txt";

fs.stat(fileName, (err, stats) => {
    if (err) {
        console.error(`Error retrieving file stats: ${err.message}`);
        return;
    }

    console.log(`File: ${fileName}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Created: ${new Date(stats.birthtime).toLocaleString()}`);
    console.log(`Last Modified: ${new Date(stats.mtime).toLocaleString()}`);
});
