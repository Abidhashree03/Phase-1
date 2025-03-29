const fs = require("fs");

const sourceFile = "output.txt"; 
const destinationFile = "copy.txt"; 


if (fs.existsSync(destinationFile)) {
    console.error(`Error: Destination file '${destinationFile}' already exists.`);
} else {

    fs.copyFile(sourceFile, destinationFile, (err) => {
        if (err) {
            console.error(`Error copying file: ${err.message}`);
            return;
        }
        console.log(`File copied successfully from '${sourceFile}' to '${destinationFile}'.`);
    });
}
