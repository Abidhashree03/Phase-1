import React, { Component } from "react";
const Greeting = ({ name = "World" }) => {
  return <h2>Hello, {name}!</h2>;
};

export default Greeting;
