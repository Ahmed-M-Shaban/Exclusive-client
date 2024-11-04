import { Outlet, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Button from "../../components/Button";

const RequireAuth = () => {
  const data = useAuth();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const content = data ? (
    <Outlet />
  ) : (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <span className="text-center capitalize text-text2/25 text-4xl font-medium font-Poppins">
        please log in to view this page.
      </span>
      <Button
        text="login"
        onClick={() =>
          navigate("/login", { state: { location }, replace: true })
        }
      />
    </div>
  );

  return content;
};

export default RequireAuth;
