import React from "react";

const WelcomeMessage = ({ isLoggedIn }) => {
  return (
    <div style={containerStyle}>
      <h2>{isLoggedIn ? "Welcome back!" : "Please log in"}</h2>
    </div>
  );
};

// Styling
const containerStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "20px",
};

export default WelcomeMessage;
