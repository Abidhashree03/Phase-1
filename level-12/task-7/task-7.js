const fs = require("fs");
const dirName = "new_folder";


if (!fs.existsSync(dirName)) {
    fs.mkdir(dirName, (err) => {
        if (err) {
            console.error(`Error creating directory: ${err.message}`);
            return;
        }
        console.log(`Directory '${dirName}' created successfully!`);
    });
} else {
    console.log(`Directory '${dirName}' already exists.`);
}
