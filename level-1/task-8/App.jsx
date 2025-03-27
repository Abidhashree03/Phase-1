import React from "react";
import UserMessage from "./UserMessage";

function App() {
  return (
    <div>
      <UserMessage role="admin" isLoggedIn={true} />
      <UserMessage role="user" isLoggedIn={true} />
      <UserMessage role="guest" isLoggedIn={false} />
    </div>
  );
}

export default App;
