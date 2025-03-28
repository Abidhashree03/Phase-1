import React, { useState } from "react";
import "./App.css";

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  return [value, toggle];
};

const ToggleComponent = () => {
  const [isVisible, toggleVisibility] = useToggle(false);

  return (
    <div className="toggle-container">
      <button className="toggle-button" onClick={toggleVisibility}>
        Toggle Content
      </button>
      {isVisible && <p className="toggle-content">Hello, I am now visible!</p>}
    </div>
  );
};

const App = () => {
  return <ToggleComponent />;
};

export default App;
