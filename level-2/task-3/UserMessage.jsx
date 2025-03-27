import React, { Component } from "react";
class Greeting extends Component {
  render() {
    return <h2>Hello, {this.props.name}!</h2>;
  }
}

export default Greeting;
