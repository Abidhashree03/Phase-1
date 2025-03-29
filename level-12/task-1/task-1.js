const fs = require("fs");

// Read the file sample.txt
fs.readFile("sample.txt", "utf8", (err, data) => {
    if (err) {
        console.error("Error reading the file:", err.message);
        return;
    }
    console.log("File Contents:\n", data);
});
