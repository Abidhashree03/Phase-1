
import React, { useState, useMemo, useCallback } from "react";
import "./App.css"; 

const findPrimes = (limit) => {
  console.log("Calculating primes...");
  const primes = [];
  for (let num = 2; num <= limit; num++) {
    if (primes.every((prime) => num % prime !== 0)) {
      primes.push(num);
    }
  }
  return primes;
};

const ExpensiveChild = React.memo(({ onClick }) => {
  console.log("Rendering ExpensiveChild...");
  return <button onClick={onClick}>Increase Count</button>;
});

const App = () => {
  const [limit, setLimit] = useState(50);
  const [count, setCount] = useState(0);

  
  const primes = useMemo(() => findPrimes(limit), [limit]);

 
  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div className="container">
      <h1>Optimized Prime Finder</h1>

    
      <label>Find primes up to: </label>
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="input-box"
      />

     
      <h2>Prime Numbers:</h2>
      <ul className="prime-list">
        {primes.map((prime, index) => (
          <li key={index} className="prime-item">{prime}</li>
        ))}
      </ul>


      <h2>Count: {count}</h2>
      <ExpensiveChild onClick={incrementCount} />
    </div>
  );
};

export default App;
