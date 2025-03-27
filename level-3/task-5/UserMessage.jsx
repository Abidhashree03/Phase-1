import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./App.css"

const AdvancedForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name cannot exceed 20 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    age: Yup.number()
      .min(18, "You must be at least 18 years old")
      .max(100, "Age cannot exceed 100")
      .required("Age is required"),
    city: Yup.string().required("City is required"),
    terms: Yup.boolean()
      .oneOf([true], "You must accept the terms & conditions")
      .required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      city: "",
      terms: false,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted:", values);
      alert("Form submitted successfully!");
      resetForm(); // Reset form after successful submission
    },
  });

  return (
    <div style={containerStyle}>
      <h2>Advanced Form</h2>
      <form onSubmit={formik.handleSubmit} style={formStyle}>
        {/* Name Field */}
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyle}
        />
        {formik.touched.name && formik.errors.name && <p style={errorStyle}>{formik.errors.name}</p>}

        {/* Email Field */}
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyle}
        />
        {formik.touched.email && formik.errors.email && <p style={errorStyle}>{formik.errors.email}</p>}

        {/* Password Field */}
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyle}
        />
        {formik.touched.password && formik.errors.password && <p style={errorStyle}>{formik.errors.password}</p>}

        {/* Age Field */}
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyle}
        />
        {formik.touched.age && formik.errors.age && <p style={errorStyle}>{formik.errors.age}</p>}

        {/* City Field */}
        <input
          type="text"
          name="city"
          placeholder="Enter your city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={inputStyle}
        />
        {formik.touched.city && formik.errors.city && <p style={errorStyle}>{formik.errors.city}</p>}

        {/* Terms & Conditions Checkbox */}
        <label style={checkboxLabelStyle}>
          <input
            type="checkbox"
            name="terms"
            checked={formik.values.terms}
            onChange={formik.handleChange}
          />
          Accept Terms & Conditions
        </label>
        {formik.touched.terms && formik.errors.terms && <p style={errorStyle}>{formik.errors.terms}</p>}

        {/* Submit Button */}
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
const errorStyle = { color: "red", fontSize: "14px", marginTop: "-5px" };
const checkboxLabelStyle = { display: "flex", alignItems: "center", gap: "5px", fontSize: "14px" };

export default AdvancedForm;
