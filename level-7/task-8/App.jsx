import React, { useState, useEffect } from "react";
import "./App.css";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const DebounceComponent = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div className="debounce-container">
      <h1>Debounced Search</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="debounce-input"
        placeholder="Type to search..."
      />
      <p className="debounce-result">Debounced Value: {debouncedSearch}</p>
    </div>
  );
};

const App = () => {
  return <DebounceComponent />;
};

export default App;
