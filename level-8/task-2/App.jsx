import React, { useState } from "react";
import "./App.css";

const fetchDataPromise = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: "Abi", age: 20 },
        { id: 2, name: "Barni", age: 21 },
        { id: 3, name: "vishnu", age: 22 },
      ];
      resolve(mockData);
    }, 2000);
  });
};

const FetchDataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchData = () => {
    setLoading(true);
    setError(null);

    fetchDataPromise()
      .then((mockData) => {
        setData(mockData);
        console.log("Fetched Data:", mockData);
      })
      .catch((err) => {
        setError("Failed to fetch data!");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fetch-container">
      <h1>Fetch Data </h1>
      <button className="fetch-button" onClick={handleFetchData} disabled={loading}>
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
