
import React, { createContext, useContext, useState } from "react";

import "./App.css";

// Create Theme Context
const ThemeContext = createContext();

// Theme Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Themed Page Component
const ThemedPage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`theme-container ${theme}`}>
      <h1>{theme.charAt(0).toUpperCase() + theme.slice(1)} Mode</h1>
      <ThemeToggle />
    </div>
  );
};

// Theme Toggle Button Component
const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      Toggle Theme
    </button>
  );
};

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <ThemedPage />
    </ThemeProvider>
  );
};

export default App;
