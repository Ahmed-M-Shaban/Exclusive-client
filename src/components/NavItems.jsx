import { useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NavItems = ({ className, activeStyle }) => {
  const data = useAuth();
  const location = useLocation().pathname.split("/")[1];

  return (
    <ul className={`list-none ${className}`}>
      <Link to="/">
        <li
          className={`relative capitalize font-Poppins ${
            !location && activeStyle
          }`}
        >
          home
        </li>
      </Link>

      <Link to="/contact">
        <li
          className={`relative capitalize font-Poppins ${
            location === "contact" && activeStyle
          }`}
        >
          contact
        </li>
      </Link>

      <Link to="/about">
        <li
          className={`relative capitalize font-Poppins ${
            location === "about" && activeStyle
          }`}
        >
          about
        </li>
      </Link>

      {!data ? (
        <Link to="/login">
          <li
            className={`relative capitalize font-Poppins ${
              location === "login" && activeStyle
            }`}
          >
            login
          </li>
        </Link>
      ) : (
        <li className="text-lg text-secondary2 font-medium font-Poppins">
          Hello, {data.name.split(" ")[0]}
        </li>
      )}
    </ul>
  );
};

export default NavItems;
