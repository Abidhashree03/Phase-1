import React, { useState, useCallback } from "react";
import "./App.css";

const ChildComponent = React.memo(({ onClick }) => {
  console.log("ChildComponent rendered");
  return <button className="callback-button" onClick={onClick}>Click Me</button>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []); // Memoized callback

  return (
    <div className="callback-container">
      <h1>Count: {count}</h1>
      <button className="callback-button" onClick={() => setCount(count + 1)}>Increment</button>
      <ChildComponent onClick={handleClick} />
    </div>
  );
};

const App = () => {
  return <ParentComponent />;
};

export default App;
