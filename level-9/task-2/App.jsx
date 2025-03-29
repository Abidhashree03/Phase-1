
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import "./App.css"; // Separate CSS file

const products = [
  { id: "1", name: "Laptop", description: "High-performance laptop" },
  { id: "2", name: "Smartphone", description: "Latest smartphone model" },
  { id: "3", name: "Headphones", description: "Noise-canceling headphones" }
];

// Product List Component
const ProductList = () => (
  <div className="container">
    <h2>Product List</h2>
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link to={`/products/${product.id}`} className="product-link">{product.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);


const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="container">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <Link to="/products" className="back-link">Back to Products</Link>
    </div>
  );
};

const App = () => (
  <Router>
    <nav className="navbar">
      <Link to="/products" className="nav-link">Products</Link>
    </nav>
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  </Router>
);

export default App;
