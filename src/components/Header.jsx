import React from "react";

const Header = () => {
  return (
    <div className="w-full h-11 flex-shrink-0 bg-button hidden md:block">
      <div className="common-margin h-full">
        <div className="text-text text-sm font-normal relative h-full">
          <div className="h-full flex items-center justify-center gap-2">
            <p className="inline-block font-Poppins">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
            </p>
            <span className="font-bold underline font-Poppins cursor-pointer">
              ShopNow
            </span>
          </div>
          <span className="absolute right-0 top-[50%] -translate-y-[50%] font-Poppins">
            English
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
