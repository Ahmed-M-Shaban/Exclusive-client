import React from "react";

const HoveredBtn = ({ element }) => {
  return (
    <button className="capitalize w-full py-2 bg-button text-text font-medium font-Poppins">
      {element}
    </button>
  );
};

export default HoveredBtn;
