require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Journal Entry Schema
const JournalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    tags: { type: [String], default: [] },
});

const Journal = mongoose.model("Journal", JournalSchema);

// ➕ Create a New Journal Entry
app.post("/entries", async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const newEntry = new Journal({ title, content, tags });
        await newEntry.save();
        res.status(201).json({ message: "Entry created", entry: newEntry });
    } catch (error) {
        res.status(500).json({ error: "Failed to create entry" });
    }
});

// 📜 Get All Entries (Filter by Title/Date)
app.get("/entries", async (req, res) => {
    try {
        const { title, date, tag } = req.query;
        let filter = {};
        if (title) filter.title = new RegExp(title, "i"); // Case-insensitive search
        if (date) filter.date = { $gte: new Date(date) };
        if (tag) filter.tags = tag;

        const entries = await Journal.find(filter).sort({ date: -1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch entries" });
    }
});

app.put("/entries/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        // Update the journal entry
        const updatedEntry = await Journal.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!updatedEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.json({ message: "Entry updated successfully", entry: updatedEntry });

    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// ❌ Delete an Entry
app.delete("/entries/:id", async (req, res) => {
    try {
        const deletedEntry = await Journal.findByIdAndDelete(req.params.id);
        if (!deletedEntry) return res.status(404).json({ error: "Entry not found" });
        res.json({ message: "Entry deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete entry" });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
