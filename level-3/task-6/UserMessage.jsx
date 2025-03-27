import React, { useState } from "react";
import "./App.css"
const SearchFilterList = () => {
  // List of items
  const items = [
    "Abidha Shree",
    "Barnika",
    "Tamilarasi",
    "Ramesh",
    "Vishnu Priya",
    "Bharath Sajeevan",
    "Harini Neelakandan",
    "Pradeep",
  ];

  // State to track user input
  const [searchTerm, setSearchTerm] = useState("");

  // Filter items based on search input
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <h2>Search & Filter List</h2>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={inputStyle}
      />

      {/* Render Filtered List */}
      <ul style={listStyle}>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <li key={index} style={listItemStyle}>{item}</li>
          ))
        ) : (
          <p style={noResultStyle}>No results found</p>
        )}
      </ul>
    </div>
  );
};

// Styles
const containerStyle = { textAlign: "center", marginTop: "50px" };
const inputStyle = { padding: "10px", fontSize: "16px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" };
const listStyle = { listStyleType: "none", padding: 0 };
const listItemStyle = { fontSize: "18px", margin: "5px 0" };
const noResultStyle = { color: "red", fontSize: "16px" };

export default SearchFilterList;
