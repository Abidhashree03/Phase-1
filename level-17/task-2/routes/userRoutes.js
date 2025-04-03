const express = require('express');
const User = require('../models/user'); // Import the User model

const router = express.Router();

// Route to return User schema definition
router.get('/schema', (req, res) => {
  res.json(User.schema.obj);
});

module.exports = router;
