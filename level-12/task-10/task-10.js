const fs = require("fs");

const fileToDelete = "copy.txt";

if (fs.existsSync(fileToDelete)) {
    fs.unlink(fileToDelete, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return;
        }
        console.log(`File '${fileToDelete}' deleted successfully.`);
    });
} else {
    console.log(`File '${fileToDelete}' does not exist.`);
}
