import React from "react";
import { useFormik } from "formik";

const MultiFieldForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      city: "",
    },
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
    },
  });

  return (
    <div style={containerStyle}>
      <h2>Multi-Field Form</h2>
      <form onSubmit={formik.handleSubmit} style={formStyle}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={formik.values.age}
          onChange={formik.handleChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="city"
          placeholder="Enter your city"
          value={formik.values.city}
          onChange={formik.handleChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

// Styles
const containerStyle = { textAlign: "center", marginTop: "50px" };
const formStyle = { display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" };
const inputStyle = { padding: "10px", fontSize: "16px", width: "250px", borderRadius: "5px", border: "1px solid #ccc" };
const buttonStyle = { padding: "10px 20px", fontSize: "16px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" };

export default MultiFieldForm;
