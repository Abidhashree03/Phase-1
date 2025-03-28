
import React, { useState, useEffect } from "react";
import "./App.css";

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      console.log(`Timer: ${seconds + 1} second(s)`);
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      console.log("Cleanup: Timer Stopped");
      clearInterval(interval);
    };
  }, [seconds, running]);

  return (
    <div className="timer-container">
      <h2>Timer: {seconds} second(s)</h2>
      <button className="toggle-button" onClick={() => setRunning(!running)}>
        {running ? "Stop Timer" : "Start Timer"}
      </button>
    </div>
  );
};

export default TimerComponent;
