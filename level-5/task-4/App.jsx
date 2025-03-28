import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import RecipeDetails from "./RecipeDetails";
import './styles.css'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
