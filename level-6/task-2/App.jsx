
import React, { useState } from "react";
import "./App.css";

const ToggleComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="toggle-container">
      <button className="toggle-button" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "Hide Content" : "Show Content"}
      </button>

      {isVisible && (
        <div className="toggle-content">
          <p>Hello! You toggled me ON. 🎉</p>
        </div>
      )}
    </div>
  );
};

export default ToggleComponent;
