import React from "react";
const DynamicList = () => {
  // Sample array of items
  const items = ["React", "JavaScript", "Node.js", "MongoDB", "Express"];

  return (
    <div style={containerStyle}>
      <h2>Technology Stack</h2>
      <ul style={listStyle}>
        {items.map((item, index) => (
          <li key={index} style={itemStyle}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const containerStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
};

const itemStyle = {
  fontSize: "18px",
  padding: "10px",
  backgroundColor: "#f0f0f0",
  margin: "5px",
  borderRadius: "5px",
  display: "inline-block",
  minWidth: "150px",
};

export default DynamicList;
