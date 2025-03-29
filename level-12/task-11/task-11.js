const fs = require("fs");

const fileToWatch = "modified.txt"; 

if (!fs.existsSync(fileToWatch)) {
    console.log(`File '${fileToWatch}' does not exist. Creating it...`);
    fs.writeFileSync(fileToWatch, "This is a monitored file.");
}

console.log(`Watching for changes on '${fileToWatch}'...`);

fs.watch(fileToWatch, (eventType, filename) => {
    if (filename) {
        console.log(`File '${filename}' was ${eventType === "rename" ? "renamed or deleted" : "modified"}.`);
    }
});
