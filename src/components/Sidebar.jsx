import gsap from "gsap";

import { backIcon } from "../utils/constants";
import { useLocation } from "react-router-dom";
import NavItems from "./NavItems";
import { useEffect } from "react";

const Sidebar = () => {
  const location = useLocation().pathname.split("/")[1];

  const handleBackClick = () => {
    gsap.to("#side-bar", {
      translateX: "-100%",
      duration: 0.5,
      ease: "ease-in-out",
    });
  };

  useEffect(() => {
    handleBackClick();
  }, [location]);

  return (
    <div
      id="side-bar"
      className="fixed w-[80%] h-screen bg-BG top-0 bottom-0 -translate-x-[100%] overflow-x-hidden overflow-y-scroll z-50
      py-8 px-4"
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <img
            src={backIcon}
            alt="back"
            className="w-8 h-8 cursor-pointer"
            onClick={handleBackClick}
          />
          <h3 className="capitalize text-text2 font-bold text-2xl">
            exclusive
          </h3>
        </div>

        <NavItems
          className="flex flex-col gap-8"
          activeStyle="bg-secondary px-4 py-2 rounded-xl"
        />
      </div>
    </div>
  );
};

export default Sidebar;
