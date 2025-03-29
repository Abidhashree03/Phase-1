import React, { useState, useEffect, memo } from "react";

const generateItems = () => Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`);

const LargeList = memo(({ items }) => {
  console.log("Rendering LargeList...");
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}, (prevProps, nextProps) => {
 
  return JSON.stringify(prevProps.items) === JSON.stringify(nextProps.items);
});

const App = () => {
  const [count, setCount] = useState(0);
  const [items] = useState(generateItems);

  useEffect(() => {
    const interval = setInterval(() => setCount((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Optimized Large List</h1>
      <h2>Counter: {count}</h2> 
      <LargeList items={items} />
    </div>
  );
};

export default App;
