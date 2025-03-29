const fs = require("fs");
const path = require("path");

// Define file paths
const inputCsvPath = path.join(__dirname, "data.csv");
const outputCsvPath = path.join(__dirname, "processed_results.csv");

/**
 * Reads, processes, and writes CSV data.
 */
function processCsvFile() {
    fs.readFile(inputCsvPath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err.message);
            return;
        }

        try {
            // Split CSV data into lines
            const lines = data.trim().split("\n");
            const headers = lines[0].split(",");

            // Parse the data into an array of objects
            const records = lines.slice(1).map((line) => {
                const values = line.split(",");
                let obj = {};
                headers.forEach((header, index) => {
                    obj[header] = isNaN(values[index]) ? values[index] : parseFloat(values[index]);
                });
                return obj;
            });

            // Calculate average of a numeric column (e.g., "Score")
            let total = 0, count = 0;
            let maxScore = -Infinity, minScore = Infinity;

            records.forEach((record) => {
                if (typeof record.Score === "number") {
                    total += record.Score;
                    count++;
                    if (record.Score > maxScore) maxScore = record.Score;
                    if (record.Score < minScore) minScore = record.Score;
                }
            });

            const averageScore = count > 0 ? (total / count).toFixed(2) : "N/A";

            // Prepare processed CSV output
            const outputData = [
                "Statistic,Value",
                `Average Score,${averageScore}`,
                `Highest Score,${maxScore}`,
                `Lowest Score,${minScore}`,
            ].join("\n");

            // Write processed results to a new CSV file
            fs.writeFile(outputCsvPath, outputData, "utf8", (err) => {
                if (err) {
                    console.error("Error writing file:", err.message);
                } else {
                    console.log("Processed results saved to", outputCsvPath);
                }
            });

        } catch (parseError) {
            console.error("Error processing CSV:", parseError.message);
        }
    });
}

// Run the CSV processing function
processCsvFile();
