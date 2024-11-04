import React from "react";

const AddressInput = ({ label, required }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="capitalize opacity-40">
        {label}
        {required && <span className="text-secondary2">*</span>}
      </label>

      <input
        type="text"
        className="border-none outline-none w-[470px] h-[50px] bg-secondary rounded px-3"
      />
    </div>
  );
};

export default AddressInput;
