import React from "react";

function Button({
  bgcolor = "blue-500",
  className = "",
  textColor = "white",
  text,
  icon,
  onClick,
  ...props
}) {
  return (
    <button
    onClick={onClick}
      className={` ${className} ${bgcolor} ${textColor} px-4 rounded-md py-2`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <p>{text}</p>
    </button>
  );
}

export default Button;
