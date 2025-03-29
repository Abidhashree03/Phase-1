const fs = require("fs");


const data = "Hello, Node.js!";


fs.writeFile("output.txt", data, "utf8", (err) => {
    if (err) {
        console.error("Error writing to file:", err.message);
        return;
    }
    console.log("File written successfully!");
});
