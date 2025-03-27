import React from "react";
import PropTypes from "prop-types";

const UserMessage = ({ name, age, city }) => {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
};

// ✅ Correctly define PropTypes
UserMessage.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number, // Expected a number
  city: PropTypes.string,
};

export default UserMessage;
