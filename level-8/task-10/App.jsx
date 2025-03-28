import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Importing CSS file

const cache = new Map(); // Simple caching mechanism

const useAxios = (url, forceRefresh = false) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!forceRefresh && cache.has(url)) {
        setData(cache.get(url));
        setLoading(false);
        return;
      }

      const response = await axios.get(url);
      cache.set(url, response.data);
      setData(response.data);
    } catch (err) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, forceRefresh]);

  return { data, loading, error, refresh: fetchData };
};

const App = () => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const { data, loading, error, refresh } = useAxios(
    "https://jsonplaceholder.typicode.com/posts",
    forceRefresh
  );

  return (
    <div className="container">
      <h2 className="heading">Axios Data Fetcher (with Cache)</h2>
      <button className="button" onClick={() => setForceRefresh(!forceRefresh)}>
        Refresh Data
      </button>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <ul className="list">
        {data?.slice(0, 5).map((post) => (
          <li key={post.id} className="list-item">
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
