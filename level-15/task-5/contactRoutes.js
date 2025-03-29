import express from "express";
import Contact from "./contact.js";
import mongoose from "mongoose";
import contact from "./contact.js"; // Import your model

const app = express();
app.use(express.json()); // Ensure body is parsed

app.put("/contacts/:id", async (req, res) => {
  console.log("Request Params:", req.params.id);
  console.log("Request Body:", req.body);

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const router = express.Router();

// Add Contact
router.post("/contacts", async (req, res) => {
    try {
        const { name, email, phone, address, group } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({ error: "Name, Email, and Phone are required" });
        }

        const newContact = new Contact({ name, email, phone, address, group });
        await newContact.save();

        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Get All Contacts
router.get("/", async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

// Search Contact
router.get("/search", async (req, res) => {
    const { name } = req.query;
    const contacts = await Contact.find({ name: new RegExp(name, "i") });
    res.json(contacts);
});

router.put("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators:  true});

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.json(contact);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete Contact
router.delete("/contacts/:id", async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});


export default router;
