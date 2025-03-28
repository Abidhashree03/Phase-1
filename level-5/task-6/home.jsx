import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "YOUR_API_KEY";
const API_URL = "https://www.omdbapi.com/";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch movies from API
  const fetchMovies = async () => {
    if (searchTerm.trim() === "") return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.get(`${API_URL}?s=${searchTerm}&apikey=${"fc9ffd7b"}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Something went wrong! Try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Movie Search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchMovies}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"} alt={movie.Title} />
            <h2>
              <Link to={`/movie/${movie.imdbID}`} className="movie-title">{movie.Title} ({movie.Year})</Link>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
