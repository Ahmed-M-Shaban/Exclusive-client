import React from "react";

const SmallError = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-fit my-auto text-sm">
      <span className="text-text2/50 font-Poppins">
        sorry, something went wrong.
      </span>
      <span className="flex items-center justify-center w-6 h-6 bg-secondary2 rounded-full text-white font-bold">
        !
      </span>
    </div>
  );
};

export default SmallError;
