import React, { useState } from "react";
import WelcomeMessage from "./UserMessage";
import "./App.css"
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <WelcomeMessage isLoggedIn={isLoggedIn} />
      <button onClick={() => setIsLoggedIn(!isLoggedIn)} style={buttonStyle}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
};

// Button styling
const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
  marginTop: "10px",
};

export default App;
