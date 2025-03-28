
import React, { useReducer } from "react";
import "./App.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
};

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div className="counter-container">
      <h1>Counter: {state.count}</h1>
      <div className="button-group">
        <button className="counter-button" onClick={() => dispatch({ type: "increment" })}>increment</button>
        <button className="counter-button" onClick={() => dispatch({ type: "decrement" })}>decrement</button>
        <button className="counter-button reset" onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
};

const App = () => {
  return <Counter />;
};

export default App;
