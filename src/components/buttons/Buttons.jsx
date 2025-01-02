import React from "react";
import PropTypes from "prop-types";

const Buttons = ({
  text = "Click Me",
  className = "",
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      className={`px-5 h-12 text-white bg-primary rounded-md hover:bg-opacity-80 transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

buttons.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default Buttons;
