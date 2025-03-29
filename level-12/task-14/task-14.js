const fs = require("fs");
const path = require("path");


function copyLargeFile(source, destination) {
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    let totalBytes = 0;
    let copiedBytes = 0;

    fs.stat(source, (err, stats) => {
        if (err) {
            return console.error("Error reading file stats:", err.message);
        }
        totalBytes = stats.size;
        console.log(`Copying file: ${source} (${(totalBytes / 1024 / 1024).toFixed(2)} MB)`);

        readStream.on("data", (chunk) => {
            copiedBytes += chunk.length;
            const progress = ((copiedBytes / totalBytes) * 100).toFixed(2);
            process.stdout.write(`\rProgress: ${progress}%`);
        });

        readStream.on("error", (err) => console.error("\nRead error:", err.message));
        writeStream.on("error", (err) => console.error("\nWrite error:", err.message));

        readStream.on("end", () => console.log("\nCopy complete!"));
    });

    readStream.pipe(writeStream);
}

const sourceFile = path.join(__dirname, "largeFile.txt"); 
const destinationFile = path.join(__dirname, "largeFile_copy.txt");

copyLargeFile(sourceFile, destinationFile);
