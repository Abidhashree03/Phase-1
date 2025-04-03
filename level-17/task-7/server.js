const express = require('express');
const mongoose = require('mongoose');
const User = require('./User'); // Import the User model

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongoose_hooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Route to create a new user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user.generateProfile()); // Uses the instance method
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to get all active users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to find users by email domain
app.get('/api/users/domain/:domain', async (req, res) => {
  try {
    const users = await User.findByEmailDomain(req.params.domain);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
