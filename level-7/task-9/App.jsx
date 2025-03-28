
import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const useIntersectionObserver = (callback, options) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options]);

  return targetRef;
};

const IntersectionComponent = () => {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`));
  
  const loadMoreItems = () => {
    setItems((prevItems) => [...prevItems, ...Array.from({ length: 5 }, (_, i) => `Item ${prevItems.length + i + 1}`)]);
  };

  const targetRef = useIntersectionObserver(loadMoreItems, { threshold: 1.0 });

  return (
    <div className="infinite-scroll-container">
      <h1>Infinite Scroll</h1>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">{item}</li>
        ))}
      </ul>
      <div ref={targetRef} className="loading-indicator">Loading more items...</div>
    </div>
  );
};

const App = () => {
  return <IntersectionComponent />;
};

export default App;
