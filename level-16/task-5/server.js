import express from "express";
import path from "path";

const app = express();
const PORT = 3005;

// Serve static files from "public" directory
app.use(express.static("public"));

// Route with query parameters
app.get("/search", (req, res) => {
    const query = req.query.q || "No query provided";
    const limit = req.query.limit || 5;

    res.json({ message: `Search for: ${query}, Limit: ${limit}` });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
