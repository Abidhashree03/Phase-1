import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BlogPost from "./BlogPost";
import './App.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
