import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};


const Home = () => (
  <div className="container">
    <h1>Welcome to Our App</h1>
    <p>Please log in to access protected pages.</p>
  </div>
);


const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      login();
      navigate("/dashboard");
      alert("Invalid credentials! Use admin/password");
    }
  };

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="container">
      <h1>Login</h1>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

const Dashboard = () => (
  <div className="container">
    <h1>Dashboard</h1>
    <p>Welcome to the protected dashboard page.</p>
  </div>
);

const Profile = () => (
  <div className="container">
    <h1>Profile</h1>
    <p>This is a protected profile page.</p>
  </div>
);

const LogoutButton = () => {
  const { logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!isAuthenticated) return null;

  return (
    <button className="logout-button" onClick={() => { logout(); navigate("/"); }}>
      Logout
    </button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <LogoutButton />
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
