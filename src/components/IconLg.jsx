import React from "react";

const IconLg = ({ icon, alt, iconClass }) => {
  return (
    <img
      src={icon}
      alt={alt}
      className={`w-14 h-14 cursor-pointer ${iconClass}`}
    />
  );
};

export default IconLg;
