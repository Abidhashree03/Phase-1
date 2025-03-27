import React from "react";
const Hello = ({ bgColor }) => {
  const divStyle = {
    backgroundColor: bgColor || "lightgray", // Default color if no prop is provided
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  };

  return (
    <div style={divStyle}>
      <h1>HELLO ABIDHA SHREE!</h1>
      <p>I AM A "B.TECH INFORMATION TECHNOLOGY" STUDENT</p>
      <p>The background color of this div is: {bgColor}</p>
    </div>
  );
};

export default Hello;
