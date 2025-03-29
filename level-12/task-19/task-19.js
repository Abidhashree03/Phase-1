const fs = require("fs");
const zlib = require("zlib");
const path = require("path");

// Function to compress a file
function compressFile(sourceFile, compressedFile) {
    const readStream = fs.createReadStream(sourceFile);
    const writeStream = fs.createWriteStream(compressedFile);
    const gzip = zlib.createGzip();

    readStream
        .pipe(gzip)
        .pipe(writeStream)
        .on("finish", () => console.log(`Compressed: ${compressedFile}`))
        .on("error", (err) => console.error("Compression error:", err));
}

// Function to decompress a file
function decompressFile(compressedFile, outputFile) {
    const readStream = fs.createReadStream(compressedFile);
    const writeStream = fs.createWriteStream(outputFile);
    const gunzip = zlib.createGunzip();

    readStream
        .pipe(gunzip)
        .pipe(writeStream)
        .on("finish", () => console.log(`Decompressed: ${outputFile}`))
        .on("error", (err) => console.error("Decompression error:", err));
}

// Test file paths
const sourceFile = path.join(__dirname, "test.txt");
const compressedFile = path.join(__dirname, "test.txt.gz");
const decompressedFile = path.join(__dirname, "test_decompressed.txt");

// Check if the test file exists; if not, create one
if (!fs.existsSync(sourceFile)) {
    fs.writeFileSync(sourceFile, "This is a test file for compression and decompression.");
    console.log(`Created test file: ${sourceFile}`);
}

// Run compression
compressFile(sourceFile, compressedFile);

// Wait a bit before decompression to ensure the file is written
setTimeout(() => {
    decompressFile(compressedFile, decompressedFile);
}, 2000);
