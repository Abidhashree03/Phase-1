import React from "react";
import UserMessage from "./UserMessage";
function App() {
  return (
    <div>
      <UserMessage name="John" age="twenty-five" city="New York" /> {/* ❌ age should be a number */}
    </div>
  );
}

export default App;
