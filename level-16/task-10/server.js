const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files (CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Dummy data
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];

// Homepage
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Error Handling Demo</h1><p><a href="/error">Trigger Error</a></p><p><a href="/users/5">Get User (may fail)</a></p>');
});

// Route that throws an error
app.get('/error', (req, res, next) => {
    next(new Error('Manual error thrown!'));
});

// Route for user
app.get('/users/:id', (req, res, next) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        const err = new Error('User not found');
        err.status = 404;
        return next(err);
    }
    res.send(`<h1>User Details</h1><p>Name: ${user.name}</p>`);
});

// Sample API
app.get('/api/data', (req, res) => {
    res.json({ message: 'API working fine' });
});

// 404 Middleware
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Global Error Handler
app.use((err, req, res, next) => {
    const isApi = req.originalUrl.startsWith('/api');
    const status = err.status || 500;

    if (isApi) {
        return res.status(status).json({
            error: {
                message: err.message,
                ...(app.get('env') === 'development' && { stack: err.stack })
            }
        });
    }

    res.status(status);
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
