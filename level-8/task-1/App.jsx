import React, { useState } from "react";
import "./App.css";

const fetchData = (callback) => {
  setTimeout(() => {
    const mockData = [
      { id: 1, name: "Abi", age: 20 },
      { id: 2, name: "Barnika", age: 21 },
      { id: 3, name: "vishnu", age: 22 },
    ];
    callback(mockData);
  }, 2000);
};

const FetchDataComponent = () => {
  const [data, setData] = useState(null);

  const handleFetchData = () => {
    fetchData((mockData) => {
      setData(mockData);
      console.log("Fetched Data:", mockData);
    });
  };

  return (
    <div className="fetch-container">
      <h1>Fetch Data</h1>
      <button className="fetch-button" onClick={handleFetchData}>
        Fetch Data
      </button>
      {data && (
        <ul className="data-list">
          {data.map((item) => (
            <li key={item.id} className="data-item">
              {item.name} (Age: {item.age})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchDataComponent;
