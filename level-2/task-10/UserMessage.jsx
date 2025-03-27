import React, { useState } from "react";

const FormComponent = () => {
  // State to store form data
  const [formData, setFormData] = useState({ name: "", email: "" });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page refresh
    console.log("Form Data Submitted:", formData);
  };
return (
    <div style={containerStyle}>
      <h2>Fill the Form</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};
const containerStyle = {
  textAlign: "center",
  marginTop: "50px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "10px",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  width: "250px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

export default FormComponent;
