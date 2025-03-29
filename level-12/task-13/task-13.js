const fs = require("fs");
const path = require("path");
const os = require("os");


function createTempFiles() {
    const tempDirPrefix = path.join(os.tmpdir(), "tempDir-");

    fs.mkdtemp(tempDirPrefix, (err, tempDir) => {
        if (err) {
            return console.error("Error creating temporary directory:", err.message);
        }

        console.log(`Temporary directory created: ${tempDir}`);

        const files = [
            { name: "file1.txt", content: "Hello, this is file 1." },
            { name: "file2.txt", content: "This is file 2 with some text." },
            { name: "file3.txt", content: "File 3 contains sample data." },
        ];

 
        files.forEach((file) => {
            const filePath = path.join(tempDir, file.name);
            fs.writeFile(filePath, file.content, (err) => {
                if (err) {
                    return console.error(`Error writing to ${filePath}:`, err.message);
                }
                console.log(`File created: ${filePath}`);
            });
        });
    });
}

createTempFiles();
