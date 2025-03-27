import React, { useState } from "react";

const DynamicText = () => {
  const [text, setText] = useState("");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Type Something Below 👇</h2>
      <input
        type="text"
        placeholder="Start typing..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={inputStyle}
      />
      <p style={textStyle}>You typed: {text}</p>
    </div>
  );
};

// Input styling
const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "60%",
  textAlign: "center",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

// Text styling
const textStyle = {
  fontSize: "18px",
  marginTop: "20px",
  color: "#333",
};

export default DynamicText;
