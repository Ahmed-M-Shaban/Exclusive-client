import React from "react";

const SmallButton = ({ text = "", onClick = () => {} }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center px-11 py-2.5 text-text capitalize font-medium font-Poppins bg-secondary2 rounded cursor-pointer hover:bg-hover-button transition-all"
    >
      {text}
    </div>
  );
};

export default SmallButton;
