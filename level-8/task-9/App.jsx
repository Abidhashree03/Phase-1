import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const CancelableRequestComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const source = axios.CancelToken.source(); 

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_limit=5",
          { cancelToken: source.token } // Attach cancel token
        );
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError("Error fetching data. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel("Component unmounted, request canceled.");
    };
  }, []);

  return (
    <div className="container">
      <h2>Cancelable API Request</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="data-list">
          {data.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CancelableRequestComponent;
