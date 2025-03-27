import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)} style={buttonStyle}>
        ➕ Increment
      </button>
      <button onClick={() => setCount(count - 1)} style={buttonStyle}>
        ➖ Decrement
      </button>
    </div>
  );
};
const buttonStyle = {
  margin: "5px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};

export default Counter;
