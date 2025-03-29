import 'dotenv/config';
import fetch from 'node-fetch';
import mongoose from 'mongoose';
import './weather.cjs';
import Table from 'cli-table';

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/weatherDB";

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}


async function displayWeatherTable() {
    const data = await Weather.find().sort({ timestamp: -1 }).limit(5);
    
    const table = new Table({ head: ['City', 'Temp (°C)', 'Humidity', 'Weather', 'Date'] });

    data.forEach(entry => {
        table.push([entry.city, entry.temperature, entry.humidity, entry.weather, entry.timestamp.toLocaleString()]);
    });

    console.log(table.toString());
}

// Call function after fetching weather data
fetchWeather().then(() => displayWeatherTable());

async function fetchWeather() {
    try {
        const API_KEY = process.env.WEATHER_API_KEY;
        const CITY = 'New York'; // Change city as needed
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        const data = await response.json();

        const weatherEntry = await Weather.create({
            city: data.name,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            weather: data.weather[0].description
        });

        console.log("Weather data saved:", weatherEntry);

    } catch (error) {
        console.error('Error fetching weather data:', error.message);
    }
}

// Run the script
async function main() {
    await connectDB();
    await fetchWeather();
}

main();
