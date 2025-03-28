
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./App.css";

const products = [
  { id: 1, name: "Product A", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOYJwdLRwDx3D5A5BeVJZlMFAmc6L32QTZA&s", price: 29.99 },
  { id: 2, name: "Product B", imageUrl: "https://m.media-amazon.com/images/G/31/img24/Beauty/BAU/Unrec/Headers/199_unrec_header._SX621_QL85_FMpng_.png", price: 39.99 },
  { id: 3, name: "Product C", imageUrl: "https://cdn-cdgdl.nitrocdn.com/NuHQviBvmmEbJjrsyBBmTIMsXPDRmbhb/assets/images/optimized/rev-d522591/cureskin.com/wp-content/uploads/2023/11/cureskin-treatment-kit-3.jpg", price: 19.99 }
];

const Product = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button 
        onClick={() => addToCart(product)} 
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

const ProductList = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Product List</h1>
        <div className="cart-icon">
          <FaShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="cart-badge">{cart.length}</span>
          )}
        </div>
      </header>
      <div className="product-grid">
        {products.map((product) => (
          <Product key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
