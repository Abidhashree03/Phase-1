const fs = require("fs");
const path = require("path");

// Directory to monitor
const monitoredDir = path.join(__dirname, "monitored_folder");
const logFile = path.join(__dirname, "fsWatcher.log");

// Ensure the monitored directory exists
if (!fs.existsSync(monitoredDir)) {
    fs.mkdirSync(monitoredDir, { recursive: true });
    console.log(`Created directory: ${monitoredDir}`);
}

// Function to log events
function logEvent(eventType, filename) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${eventType}: ${filename}\n`;

    // Append event to log file
    fs.appendFile(logFile, logMessage, (err) => {
        if (err) console.error("Error writing to log file:", err);
    });

    // Print real-time updates to console
    console.log(logMessage.trim());
}

// Watch for changes in the directory
fs.watch(monitoredDir, { recursive: true }, (eventType, filename) => {
    if (filename) {
        logEvent(eventType.toUpperCase(), filename);
    }
});

// Initial message
console.log(`Monitoring directory: ${monitoredDir}`);
console.log(`Logging changes to: ${logFile}`);
console.log("Press Ctrl+C to stop watching.");
