import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { selectCurrentToken } from "../features/auth/authSlice";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  // let isManager = false;
  // let isAdmin = false;
  // let status = "Employee";

  if (token) {
    const decode = jwtDecode(token);
    const userInfo = decode.userInfo;

    // isManager = roles.includes("Manager");
    // isAdmin = roles.includes("Admin");

    // if (isManager) status = "Manager";
    // if (isAdmin) status = "Admin";

    return userInfo;
  }

  return null;
};

export default useAuth;
