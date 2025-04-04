import React, { lazy, Suspense, useState } from "react";
import "./App.css";

const Dashboard = lazy(() => import("./Dashboard.jsx"));
const Profile = lazy(() => import("./Profile.jsx"));

function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  return (
    <div>
      <h1>My App</h1>
      <button onClick={() => setActiveComponent("dashboard")}>Load Dashboard</button>
      <button onClick={() => setActiveComponent("profile")}>Load Profile</button>

      <Suspense fallback={<div>Loading...</div>}>
        {activeComponent === "dashboard" && <Dashboard />}
        {activeComponent === "profile" && <Profile />}
      </Suspense>
    </div>
  );
}

export default App;
