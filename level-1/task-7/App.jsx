
import React from "react";

const ItemList = () => {
  const containerStyle = {
    width: "300px",
    margin: "20px auto",
    padding: "15px",
    border: "2px solid #333",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
  };

  return (
    <div style={containerStyle}>
      <h2>My Favorite Fruits</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>Apple</li>
        <li>Banana</li>
        <li>Orange</li>
        <li>Mango</li>
        <li>Pineapple</li>
      </ul>
    </div>
  );
};

export default ItemList;
