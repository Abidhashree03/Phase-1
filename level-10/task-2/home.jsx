import { useState } from "react";
import { Link } from "react-router-dom";
import recipes from "./recipeData";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      <h1>Recipe Search</h1>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-box"
      />
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
            <h2><Link to={`/recipe/${recipe.id}`} className="recipe-title">{recipe.title}</Link></h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
