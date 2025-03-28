import React, { useState } from "react";
import "./App.css";

const useCounter = (initialValue = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
};

const CounterComponent = () => {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className="counter-container">
      <h1>Counter: {count}</h1>
      <div className="button-group">
        <button className="counter-button" onClick={increment}>+</button>
        <button className="counter-button" onClick={decrement}>-</button>
        <button className="counter-button reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

const App = () => {
  return <CounterComponent />;
};

export default App;
