import React, { useState } from "react";

const ToggleVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={() => setIsVisible(!isVisible)} style={buttonStyle}>
        {isVisible ? "Hide Text" : "Show Text"}
      </button>

      {/* Conditional rendering */}
      {isVisible && (
        <div style={boxStyle}>
          <p>This is some visible text!</p>
        </div>
      )}
    </div>
  );
};
const buttonStyle = {
  margin: "10px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};
const boxStyle = {
  marginTop: "20px",
  padding: "15px",
  backgroundColor: "#f0f0f0",
  borderRadius: "5px",
  display: "inline-block",
};

export default ToggleVisibility;
