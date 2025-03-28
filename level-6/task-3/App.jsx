import React, { useState } from "react";
import "./App.css";

const ControlledInput = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="input-container">
      <h2> Input Display</h2>
      <input
        type="text"
        className="input-field"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <p className="display-text">You typed: {inputValue}</p>
    </div>
  );
};

export default ControlledInput;
