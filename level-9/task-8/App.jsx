import React from "react";
import { FixedSizeList as List } from "react-window";
import "./App.css";

const items = Array.from({ length: 10000 }, (_, index) => `Item ${index + 1}`);

const Row = ({ index, style }) => (
  <div className="list-item" style={style}>
    {items[index]}
  </div>
);

const VirtualizedList = () => {
  return (
    <div className="container">
      <h1>Virtual Scrolling with react-window</h1>
      <List
        height={500}
        itemCount={items.length} 
        itemSize={35} 
        width={"100%"} 
      >
        {Row}
      </List>
    </div>
  );
};

const App = () => {
  return <VirtualizedList />;
};

export default App;
