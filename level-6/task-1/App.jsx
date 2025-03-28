import React, { useState } from "react";
import "./App.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h1 className="counter-title">
        Counter: <span className="animated-count">{count}</span>
      </h1>
      <button className="counter-button increment" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button className="counter-button decrement" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;
