import React from "react";
import "./App.css"
const ItemList = () => {
  const items = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
    { id: 4, name: "Grapes" },
  ];

  return (
    <div style={containerStyle}>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={listItemStyle}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const containerStyle = { textAlign: "center", marginTop: "50px" };
const listItemStyle = { fontSize: "18px", margin: "5px 0" };

export default ItemList;
