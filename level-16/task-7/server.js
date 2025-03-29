const express = require('express');
const path = require('path');
const app = express();

// Custom Logger Middleware
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${req.method}] [${req.originalUrl}]`);
    next();
};

// Apply middleware
app.use(loggerMiddleware);

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Serve HTML on root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Other routes
app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1><p>This is the about page.</p>');
});

app.post('/submit', (req, res) => {
    res.send('Form Submitted');
});

app.put('/update', (req, res) => {
    res.send('Update Successful');
});

app.delete('/delete', (req, res) => {
    res.send('Delete Successful');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
