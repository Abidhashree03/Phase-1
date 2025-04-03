const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

// Mock database
let users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', isActive: true },
    { id: 2, name: 'Bob', email: 'bob@example.com', isActive: true },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', isActive: true },
];

// Helper: Find user by ID
const findUserById = (id) => users.find(user => user.id === id);

// GET /api/users (with pagination and filtering)
app.get('/api/users', (req, res) => {
    const { limit = 10, skip = 0, name, email } = req.query;

    let filteredUsers = users.filter(user => user.isActive); // Only active users

    if (name) {
        filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (email) {
        filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
    }

    const paginatedUsers = filteredUsers.slice(parseInt(skip), parseInt(skip) + parseInt(limit));
    res.status(200).json(paginatedUsers);
});

// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = findUserById(userId);

    if (!user || !user.isActive) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

// PUT /api/users/:id (Update user)
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    if (!name && !email) {
        return res.status(400).json({ error: 'At least one field (name or email) is required to update.' });
    }

    const user = findUserById(userId);
    if (!user || !user.isActive) {
        return res.status(404).json({ error: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    res.status(200).json(user);
});

// DELETE /api/users/:id (Soft Delete)
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = findUserById(userId);

    if (!user || !user.isActive) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.isActive = false; // Soft delete
    res.status(200).json({ message: 'User has been soft deleted.' });
});

// Error handling for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
