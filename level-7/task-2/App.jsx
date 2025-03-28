import React, { useState, useRef } from "react";
import "./App.css";

const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef(null);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return { value, onChange: handleChange, inputRef };
};

const InputComponent = () => {
  const { value, onChange, inputRef } = useInput("");

  return (
    <div className="input-container">
      <input 
        ref={inputRef} 
        type="text" 
        value={value} 
        onChange={onChange} 
        className="input-field" 
        placeholder="Type something..." 
      />
      <p className="input-value">You typed: {value}</p>
    </div>
  );
};

const App = () => {
  return <InputComponent />;
};

export default App;
