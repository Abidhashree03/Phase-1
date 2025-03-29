const fs = require("fs");
const path = require("path");

// Define the path to the JSON file
const jsonFilePath = path.join(__dirname, "data.json");

/**
 * Reads, modifies, and writes JSON data.
 */
function modifyJsonFile() {
    fs.readFile(jsonFilePath, "utf8", (err, data) => {
        if (err) {
            if (err.code === "ENOENT") {
                console.error("Error: JSON file not found!");
            } else {
                console.error("Error reading file:", err.message);
            }
            return;
        }

        try {
            // Parse JSON data
            let jsonData = JSON.parse(data);

            // Modify data (example: add a new object)
            jsonData.push({
                id: jsonData.length + 1,
                name: "New Item",
                value: Math.floor(Math.random() * 100),
            });

            // Convert back to JSON string
            const updatedJson = JSON.stringify(jsonData, null, 4);

            // Write modified data back to the file
            fs.writeFile(jsonFilePath, updatedJson, "utf8", (err) => {
                if (err) {
                    console.error("Error writing to file:", err.message);
                } else {
                    console.log("JSON file updated successfully!");
                }
            });
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError.message);
        }
    });
}

// Call the function to modify JSON data
modifyJsonFile();
