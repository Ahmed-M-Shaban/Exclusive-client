import React from "react";

const IconSm = ({ icon, alt, iconClass }) => {
  return <img src={icon} alt={alt} className={`w-6 h-6 ${iconClass}`} />;
};

export default IconSm;
