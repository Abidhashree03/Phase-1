import React, { useState, useEffect } from "react";
import "./App.css";

const useWindowResize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const WindowSizeComponent = () => {
  const { width, height } = useWindowResize();

  return (
    <div className="window-size-container">
      <h1>Window Size</h1>
      <p>Width: {width}px</p>
      <p>Height: {height}px</p>
    </div>
  );
};

const App = () => {
  return <WindowSizeComponent />;
};

export default App;
