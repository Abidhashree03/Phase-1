
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import CSS

const MultiFetchComponent = () => {
  const [data, setData] = useState({ posts: [], users: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMultipleData = async () => {
      setLoading(true);
      setError("");

      try {
        const [postsResponse, usersResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/posts?_limit=5"),
          axios.get("https://jsonplaceholder.typicode.com/users?_limit=5"),
        ]);

        setData({
          posts: postsResponse.data,
          users: usersResponse.data,
        });
      } catch (err) {
        setError("Error fetching data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMultipleData();
  }, []);

  return (
    <div className="container">
      <h2>Fetched Data</h2>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <div className="data-section">
            <h3>Posts</h3>
            <ul>
              {data.posts.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </div>

          <div className="data-section">
            <h3>Users</h3>
            <ul>
              {data.users.map((user) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiFetchComponent;
