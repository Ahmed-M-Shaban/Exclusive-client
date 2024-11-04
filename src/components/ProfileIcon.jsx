import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Icon from "./Icon";
import IconSm from "./IconSm";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import {
  cancelIcon,
  logoutIcon,
  mallbagIcon,
  reviewsIcon,
  userIcon,
} from "../utils/constants";

const ProfileIcon = () => {
  let timeOut;

  const data = useAuth();
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[1];
  const [sendLogout, { isLoading }] = useSendLogoutMutation();
  const [dropdownClass, setDropdownClass] = useState(
    "opacity-0 translate-y-3 pointer-events-none"
  );

  const renderedIcon = () => {
    if (data) {
      return data.profileImage ? (
        <img
          src={data.profileImage}
          alt="user-image"
          className="w-7 h-7 rounded-full"
        />
      ) : (
        <IconSm icon={userIcon} alt="user" iconClass="icon-white" />
      );
    } else {
      return <Icon icon={userIcon} alt={"user"} />;
    }
  };

  const handleMouseEnter = () => {
    clearTimeout(timeOut);
    setDropdownClass(
      "opacity-100 translate-y-1 pointer-events-auto cursor-default"
    );
  };

  const handleMouseLeave = () => {
    timeOut = setTimeout(
      () => setDropdownClass("opacity-0 translate-y-3 pointer-events-none"),
      150
    );
  };

  const handleLogout = async () => {
    try {
      if (!isLoading) {
        await sendLogout();
        handleMouseLeave();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* profile icon */}
      <div className={`rounded-full ${data && "p-1 bg-secondary2"}`}>
        {renderedIcon()}
      </div>

      {/* dropdown */}
      {data && (
        <div
          className={`account-dropdown ${dropdownClass} ${
            location && "bg-gray-600"
          }`}
        >
          <div className="flex flex-col gap-[13px]">
            <div className="dropdown-item">
              <Icon icon={userIcon} alt="user-profile" iconClass="icon-white" />
              <span className="capitalize text-nowrap text-sm font-Poppins">
                manage my account
              </span>
            </div>

            <div className="dropdown-item">
              <IconSm
                icon={mallbagIcon}
                alt="user-profile"
                iconClass="icon-white"
              />
              <span className="capitalize text-nowrap text-sm font-Poppins">
                my orders
              </span>
            </div>

            <div className="dropdown-item">
              <IconSm
                icon={cancelIcon}
                alt="user-profile"
                iconClass="icon-white"
              />
              <span className="capitalize text-nowrap text-sm font-Poppins">
                my cancellations
              </span>
            </div>

            <div className="dropdown-item">
              <IconSm
                icon={reviewsIcon}
                alt="user-profile"
                iconClass="icon-white"
              />
              <span className="capitalize text-nowrap text-sm font-Poppins">
                my reviews
              </span>
            </div>

            <div
              className={`dropdown-item ${isLoading && "cursor-not-allowed"}`}
              onClick={handleLogout}
            >
              <IconSm
                icon={logoutIcon}
                alt="user-profile"
                iconClass="icon-white"
              />
              <span className="capitalize text-nowrap text-sm font-Poppins">
                log out
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
