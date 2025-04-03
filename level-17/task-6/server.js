const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/population_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema);

// Define Post Schema
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Post = mongoose.model('Post', postSchema);

// Route to create a new user
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to create a new post
app.post('/api/posts', async (req, res) => {
  try {
    const user = await User.findById(req.body.author);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all posts with populated author field
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get posts by author ID
app.get('/api/users/:id/posts', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const posts = await Post.find({ author: req.params.id }).populate('author', 'name email');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
