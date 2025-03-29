import fs from "fs/promises";
import path from "path";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3003;
const NOTES_DIR = "./notes"; // Directory where notes are stored

app.use(express.json());

// Ensure the notes directory exists
const ensureNotesDir = async () => {
    try {
        await fs.mkdir(NOTES_DIR, { recursive: true });
    } catch (err) {
        console.error("Error creating notes directory:", err);
    }
};

// Create a new note
app.post("/notes", async (req, res) => {
    try {
        const { title, content, category = "general" } = req.body;
        if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

        const categoryPath = path.join(NOTES_DIR, category);
        await fs.mkdir(categoryPath, { recursive: true });

        const notePath = path.join(categoryPath, `${title}.md`);
        await fs.writeFile(notePath, content, "utf-8");

        res.json({ message: "Note created successfully", path: notePath });
    } catch (error) {
        res.status(500).json({ error: "Failed to create note" });
    }
});

// List all notes
app.get("/notes", async (req, res) => {
    try {
        const categories = await fs.readdir(NOTES_DIR);
        let allNotes = [];

        for (const category of categories) {
            const categoryPath = path.join(NOTES_DIR, category);
            const files = await fs.readdir(categoryPath);
            allNotes.push(...files.map(file => `${category}/${file}`));
        }

        res.json({ notes: allNotes });
    } catch (error) {
        res.status(500).json({ error: "Failed to list notes" });
    }
});

// View a specific note
app.get("/notes/:category/:title", async (req, res) => {
    try {
        const { category, title } = req.params;
        const notePath = path.join(NOTES_DIR, category, `${title}.md`);

        const content = await fs.readFile(notePath, "utf-8");
        res.json({ title, content });
    } catch (error) {
        res.status(404).json({ error: "Note not found" });
    }
});

// Edit a note
app.put("/notes/:category/:title", async (req, res) => {
    try {
        const { category, title } = req.params;
        const { content } = req.body;

        if (!content) return res.status(400).json({ error: "Content is required" });

        const notePath = path.join(NOTES_DIR, category, `${title}.md`);
        await fs.writeFile(notePath, content, "utf-8");

        res.json({ message: "Note updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to update note" });
    }
});

// Delete a note
app.delete("/notes/:category/:title", async (req, res) => {
    try {
        const { category, title } = req.params;
        const notePath = path.join(NOTES_DIR, category, `${title}.md`);

        await fs.unlink(notePath);
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(404).json({ error: "Note not found" });
    }
});

// Search notes by content
app.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: "Query is required" });

        const categories = await fs.readdir(NOTES_DIR);
        let matchingNotes = [];

        for (const category of categories) {
            const categoryPath = path.join(NOTES_DIR, category);
            const files = await fs.readdir(categoryPath);

            for (const file of files) {
                const notePath = path.join(categoryPath, file);
                const content = await fs.readFile(notePath, "utf-8");

                if (content.includes(query)) {
                    matchingNotes.push({ title: file.replace(".md", ""), category });
                }
            }
        }

        res.json({ matchingNotes });
    } catch (error) {
        res.status(500).json({ error: "Search failed" });
    }
});

// Start server
app.listen(PORT, async () => {
    await ensureNotesDir();
    console.log(`Server running on port ${PORT}`);
});
