const express = require("express");
// const User = require("../models/User");

const router = express.Router();

// @route   POST /api/users
// @desc    Create a new user
// @access  Public
router.post("/", async (req, res) => {
  try {
    const { name, email, age } = req.body;

    // Validate request body
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, age });
    await newUser.save();

    // Return created user
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;