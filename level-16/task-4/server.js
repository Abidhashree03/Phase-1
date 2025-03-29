import express from "express";
import path from "path";

const app = express();
const PORT = 3004;

// Serve static files from "public" directory
app.use(express.static("public"));

// Route with dynamic parameter
app.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    res.json({ message: `User ID: ${userId}` });
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
