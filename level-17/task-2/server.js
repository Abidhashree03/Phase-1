require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json()); // Middleware to parse JSON
app.use('/api/users', userRoutes); // Mount the user routes

app.get('/', (req, res) => {
  res.send('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
