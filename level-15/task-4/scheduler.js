const cron = require('node-cron');
const fetchWeather = require('./fetchWeather');

// Schedule to fetch weather data every hour
cron.schedule('0 * * * *', () => {
    console.log('Fetching weather data...');
    fetchWeather();
});

console.log('Weather scheduler running...');
