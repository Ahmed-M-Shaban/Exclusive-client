import React from "react";

const Button = ({ text, onClick, className, id }) => {
  return (
    <>
      <button
        id={id}
        onClick={onClick}
        className={`${className} capitalize bg-button2 rounded-[4px] text-base text-text font-medium font-Poppins px-12 py-4 cursor-pointer hover:bg-hover-button transition-all`}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
