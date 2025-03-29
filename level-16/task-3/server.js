import express from "express";
import cors from "cors";

const app = express();
const PORT = 3003;

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.static("public")); // Serve HTML & CSS

// User Data API
app.get("/api/users", (req, res) => {
    const users = [
        { id: 1, name: "Abidha", email: "abidhashreexia@gmail.com" },
        { id: 2, name: "Barnika", email: "barnika@gmail.com" },
        { id: 3, name: "bharath", email: "bharath@gmail.com" }
    ];
    res.json(users);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
