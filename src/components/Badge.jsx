import React from "react";

const Badge = ({ children, count, maxCount = 99 }) => {
  return (
    <div className="relative">
      {children}

      {count !== 0 && (
        <div className="absolute -top-1 left-[60%] flex items-center justify-center p-1 min-w-5 h-5 rounded-full bg-secondary2 text-xs font-semibold text-text">
          {count <= maxCount ? count : `${maxCount}+`}
        </div>
      )}
    </div>
  );
};

export default Badge;
