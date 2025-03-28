import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; 

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

let activeRequests = 0;
const setLoading = (isLoading) => {
  const loadingIndicator = document.getElementById("loading-indicator");
  if (loadingIndicator) {
    loadingIndicator.style.display = isLoading ? "block" : "none";
  }
};

api.interceptors.request.use(
  (config) => {
    activeRequests++;
    setLoading(true);
    config.headers.Authorization = `Bearer fakeToken123`; // Mock token
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);
    console.log("Response Data:", response.data);
    return response;
  },
  (error) => {
    activeRequests--;
    if (activeRequests === 0) setLoading(false);

    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        alert("Unauthorized! Please log in.");
      } else if (status === 404) {
        alert("Resource not found!");
      } else if (status === 500) {
        alert("Server error! Try again later.");
      }
    } else {
      alert("Network error! Please check your internet connection.");
    }
    return Promise.reject(error);
  }
);
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data.slice(0, 5));
      } catch (err) {
        setError("Failed to fetch posts.");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="data-container">
      <h2>Posts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data.slice(0, 5));
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="data-container">
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div className="app-container">
      <div id="loading-indicator" className="loading-indicator">
        Loading...
      </div>
      <h1>Axios Interceptors Example</h1>
      <Posts />
      <Users />
    </div>
  );
};

export default App;
