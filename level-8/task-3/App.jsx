import React, { useState } from "react";
import "./App.css";

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: "Alice", age: 25 },
        { id: 2, name: "Bob", age: 30 },
        { id: 3, name: "Charlie", age: 35 },
      ];
      resolve(mockData);
    }, 2000);
  });
};

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDataAsync = async () => {
    setLoading(true);
    setError(null);
    try {
      const mockData = await fetchDataPromise();
      setData(mockData);
      console.log("Fetched Data:", mockData);
    } catch (err) {
      setError("Failed to fetch data!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fetch-container">
      <h1>Fetch Data</h1>
      <button className="fetch-button" onClick={fetchDataAsync} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Data"}
      </button>
      {error && <p className="error-message">{error}</p>}
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
