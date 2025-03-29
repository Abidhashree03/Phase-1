require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Weather = require('./weather');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get all weather data
app.get('/weather', async (req, res) => {
    try {
        const data = await Weather.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

// Get weather data for a specific date range
app.get('/weather/history', async (req, res) => {
    const { start, end } = req.query;
    try {
        const data = await Weather.find({
            timestamp: { $gte: new Date(start), $lte: new Date(end) }
        });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch historical weather data' });
    }
});

// Get latest weather entry
app.get('/weather/latest', async (req, res) => {
    try {
        const latestWeather = await Weather.findOne().sort({ timestamp: -1 });
        res.json(latestWeather);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch latest weather data' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
