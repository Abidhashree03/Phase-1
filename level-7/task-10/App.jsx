
import React, { useState, useEffect } from "react";
import "./App.css";

const useGeolocation = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const success = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const error = (err) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { location, error };
};

const GeolocationComponent = () => {
  const { location, error } = useGeolocation();

  return (
    <div className="geo-container">
      <h1>Geolocation</h1>
      {error ? (
        <p className="geo-error">Error: {error}</p>
      ) : (
        <p className="geo-location">
          Latitude: {location.lat}, Longitude: {location.lon}
        </p>
      )}
    </div>
  );
};

const App = () => {
  return <GeolocationComponent />;
};
