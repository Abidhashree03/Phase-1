const express = require('express');
const app = express();
const PORT = 3000;

// Mock database
const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 4, name: 'David', email: 'david@example.com' },
    { id: 5, name: 'Eve', email: 'eve@example.com' },
];

// GET /api/users with pagination and filtering
app.get('/api/users', (req, res) => {
    const { limit = 10, skip = 0, name, email } = req.query;

    let filteredUsers = users;

    if (name) {
        filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (email) {
        filteredUsers = filteredUsers.filter(user => user.email.toLowerCase().includes(email.toLowerCase()));
    }

    const paginatedUsers = filteredUsers.slice(parseInt(skip), parseInt(skip) + parseInt(limit));

    res.status(200).json(paginatedUsers);
});

// GET /api/users/:id with error handling
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

// Error handling middleware for unknown routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
