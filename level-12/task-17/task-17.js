const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Define file paths
const inputFilePath = path.join(__dirname, "sensitive.txt");
const encryptedFilePath = path.join(__dirname, "encrypted.dat");
const decryptedFilePath = path.join(__dirname, "decrypted.txt");

// Encryption key (must be 32 bytes for AES-256)
const encryptionKey = crypto.randomBytes(32);
const iv = crypto.randomBytes(16); // Initialization vector (16 bytes)

// Encrypt function
function encryptFile(inputPath, outputPath, key, iv) {
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(cipher).pipe(output);

    output.on("finish", () => {
        console.log(`File encrypted successfully: ${outputPath}`);
        fs.writeFileSync("encryption.key", key.toString("hex")); // Store the key securely
        fs.writeFileSync("encryption.iv", iv.toString("hex")); // Store IV securely
    });

    output.on("error", (err) => console.error("Encryption error:", err));
}

// Decrypt function
function decryptFile(inputPath, outputPath, key, iv) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);

    output.on("finish", () => {
        console.log(`File decrypted successfully: ${outputPath}`);
    });

    output.on("error", (err) => console.error("Decryption error:", err));
}

// Run encryption
encryptFile(inputFilePath, encryptedFilePath, encryptionKey, iv);

// Wait for encryption to finish, then decrypt (to ensure sequential execution)
setTimeout(() => {
    const storedKey = Buffer.from(fs.readFileSync("encryption.key", "utf8"), "hex");
    const storedIV = Buffer.from(fs.readFileSync("encryption.iv", "utf8"), "hex");
    decryptFile(encryptedFilePath, decryptedFilePath, storedKey, storedIV);
}, 2000);
