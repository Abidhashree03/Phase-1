const fs = require("fs");


const fileName = "sample.txt";

if (fs.existsSync(fileName)) {
    console.log(`The file "${fileName}" exists.`);
} else {
    console.log(`The file "${fileName}" does not exist.`);
}
