import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the separate CSS file

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setData(response.data);
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="data-container">
      <h2>Fetched Data</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul>
        {data.slice(0, 10).map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
