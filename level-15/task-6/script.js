import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const algorithm = 'aes-256-cbc';
const key = crypto.scryptSync('your-password', 'salt', 32); // Derive a key
const iv = crypto.randomBytes(16); // Initialization vector

function encryptFile(inputFile, outputFile) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);
    
    output.write(iv);
    input.pipe(cipher).pipe(output);
    console.log(`File encrypted: ${outputFile}`);
}

function decryptFile(inputFile, outputFile) {
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);
    
    let iv = Buffer.alloc(16);
    input.read(16);
    input.on('data', (chunk) => {
        if (!iv) {
            iv = chunk.slice(0, 16);
            chunk = chunk.slice(16);
        }
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        output.write(decipher.update(chunk));
    });
    
    input.on('end', () => {
        output.end();
        console.log(`File decrypted: ${outputFile}`);
    });
}

const command = process.argv[2];
const inputFile = process.argv[3];
const outputFile = process.argv[4];

if (command === 'encrypt') {
    encryptFile(inputFile, outputFile);
} else if (command === 'decrypt') {
    decryptFile(inputFile, outputFile);
} else {
    console.log('Usage: node script.js <encrypt|decrypt> <inputFile> <outputFile>');
}
