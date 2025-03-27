import React, { Component } from "react";
const Greeting = ({ name, age, city }) => {
  return (
    <div>
      <h2>Hello:{name}</h2>
      <h2>Age: {age}</h2>
      <h2>City: {city}</h2>
    </div>
  );
};

export default Greeting;
