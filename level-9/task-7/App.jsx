import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useSearchParams } from "react-router-dom";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1000 },
  { id: 2, name: "Headphones", category: "Electronics", price: 200 },
  { id: 3, name: "Shoes", category: "Fashion", price: 50 },
  { id: 4, name: "T-shirt", category: "Fashion", price: 20 },
  { id: 5, name: "Smartphone", category: "Electronics", price: 800 },
  { id: 6, name: "Watch", category: "Accessories", price: 150 },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";

  const [filters, setFilters] = useState({ searchTerm, category, minPrice, maxPrice });

  const updateSearchParams = () => {
    const params = {};
    if (filters.searchTerm) params.q = filters.searchTerm;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    
    setSearchParams(params);
  };
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        (filters.searchTerm === "" || product.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
        (filters.category === "" || product.category === filters.category) &&
        (filters.minPrice === "" || product.price >= parseFloat(filters.minPrice)) &&
        (filters.maxPrice === "" || product.price <= parseFloat(filters.maxPrice))
      );
    });
  }, [searchParams]);

  return (
    <div className="container">
      <h1>Product Search</h1>
      <div className="search-form">
        <input
          type="text"
          placeholder="Search..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
        />
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Accessories">Accessories</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />
        <button onClick={updateSearchParams} className="btn">Search</button>
      </div>

      <h2>Results:</h2>
      <ul className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li key={product.id} className="product-item">
              {product.name} - ${product.price} ({product.category})
            </li>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/search" className="nav-link">Search</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1 className="container">Welcome to the Product Store</h1>} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default App;
