import React, { useState } from "react";
import "./App.css";

const UserForm = () => {
  const [user, setUser] = useState({ name: "", age: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <h2>Update User Info</h2>
      <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={user.name}
        onChange={handleChange}
        className="input-field"
      />
      <input
        type="number"
        name="age"
        placeholder="Enter your age"
        value={user.age}
        onChange={handleChange}
        className="input-field"
      />
      <p className="display-text">Name: {user.name || "N/A"}</p>
      <p className="display-text">Age: {user.age || "N/A"}</p>
    </div>
  );
};

export default UserForm;
