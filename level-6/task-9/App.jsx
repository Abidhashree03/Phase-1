import React, { useRef } from "react";
import "./App.css";

const InputFocus = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="input-container">
      <input ref={inputRef} type="text" placeholder="Type something..." className="input-field" />
      <button className="focus-button" onClick={handleFocus}>Focus Input</button>
    </div>
  );
};

const App = () => {
  return <InputFocus />;
};

export default App;
