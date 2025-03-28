
import React, { useState, useEffect } from "react";
import "./App.css";

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

const StorageComponent = () => {
  const [text, setText] = useLocalStorage("storedText", "");

  return (
    <div className="storage-container">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        className="input-field" 
        placeholder="Type something..." 
      />
      <p className="input-value">Stored Value: {text}</p>
    </div>
  );
};

const App = () => {
  return <StorageComponent />;
};

export default App;
