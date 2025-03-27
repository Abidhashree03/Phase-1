import React from "react";
const UserMessage = ({ role, isLoggedIn }) => {
  return (
    <div style={styles.container}>
      {isLoggedIn ? (
        role === "admin" ? (
          <h2>Welcome, Admin! 👑</h2>
        ) : (
          <h2>Welcome, User! 😊</h2>
        )
      ) : (
        <h2>Please Log In! 🔐</h2>
      )}
      <p>
        {role === "admin"
          ? "You have full access to manage the system."
          : "You can browse and access general features."}
      </p>
    </div>
  );
};
const styles = {
  container: {
    width: "300px",
    margin: "20px auto",
    padding: "15px",
    border: "2px solid #333",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default UserMessage;
