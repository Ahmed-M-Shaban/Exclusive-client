import gsap from "gsap";

import NavItems from "./NavItems";
import SeacrchBox from "./SeacrchBox";
import useAuth from "../hooks/useAuth";
import NavRightIcons from "./NavRightIcons";
import { menuIcon } from "../utils/constants";

const Navbar = () => {
  const data = useAuth();

  const handleMenuClick = () => {
    gsap.to("#side-bar", {
      translateX: 0,
      duration: 0.5,
      ease: "ease-in-out",
    });
  };

  return (
    <div className="border-b-[1px] border-secondary">
      <div className="flex max-md:flex-col items-end justify-center common-margin py-4">
        <div className="flex w-full justify-between">
          {/* logo */}
          <div className="flex items-center gap-2">
            <img
              src={menuIcon}
              alt=""
              className="w-8 h-8 cursor-pointer lg:hidden"
              onClick={handleMenuClick}
            />
            <h1 className="text-2xl font-bold">Exclusive</h1>
          </div>

          {/* navigation items */}
          <NavItems
            className="hidden lg:flex items-center gap-12"
            activeStyle="underline-nav"
          />

          <div className="flex gap-6">
            {/* search box */}
            <SeacrchBox className="hidden md:flex w-60 flex-shrink-[2] font-Poppins" />

            {/* right icons */}
            {data && <NavRightIcons userData={data} />}
          </div>
        </div>

        {/* phone search box */}
        <SeacrchBox className="flex md:hidden w-full mt-2 font-Poppins" />
      </div>
    </div>
  );
};

export default Navbar;
