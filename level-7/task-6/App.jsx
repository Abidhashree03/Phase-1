import React, { useState, useEffect } from "react";
import "./App.css";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const TitleComponent = () => {
  const [count, setCount] = useState(0);
  
  useDocumentTitle(`Count: ${count}`);

  return (
    <div className="title-container">
      <h1>Current Count: {count}</h1>
      <button className="title-button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

const App = () => {
  return <TitleComponent />;
};

export default App;
