import React from "react";

const Roadmap = ({ road }) => {
  return (
    <div className="flex gap-3 text-sm capitalize text-text2/50">
      {road.map((item, index) => (
        <React.Fragment key={index}>
          <span
            className={`font-Poppins ${
              index === road.length - 1 && "text-text2"
            }`}
          >
            {item}
          </span>

          {index !== road.length - 1 && <span>/</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Roadmap;
