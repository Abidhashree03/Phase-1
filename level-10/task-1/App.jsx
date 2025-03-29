import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import "./App.css";
const App = () => {
  const [weather, setWeather] = useState(null);

  return (
    <div className="app-container">
      <h1>🌍 Weather Forecast App</h1>
      <SearchBar setWeather={setWeather} />
      {weather && <CurrentWeather weather={weather} />}
    </div>
  );
};

export default App;
