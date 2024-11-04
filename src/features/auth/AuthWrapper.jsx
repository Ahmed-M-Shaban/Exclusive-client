import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import { useRefreshMutation } from "./authApiSlice";

const AuthWrapper = ({ children }) => {
  const strictRef = useRef(false);
  const token = useSelector(selectCurrentToken);
  //  When logout the isUninitialized flag is true and there is no token, so we need a flag to know that this is not the first load.
  const trueSuccess = useRef(false);
  const [refresh, { isUninitialized, isLoading, isError }] =
    useRefreshMutation();

  const refreshToken = async () => {
    try {
      await refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //  only for react strict mode
    if (strictRef.current === true || process.env.NODE_ENV !== "development") {
      if (!token) refreshToken();
      trueSuccess.current = true;
    }

    return () => (strictRef.current = true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content;

  if (isLoading || (isUninitialized && !token && !trueSuccess.current)) {
    // content = <Loading />
    content = null;
  } else if (isError) {
    content = children;
  } else {
    content = children;
  }

  return content;
};

export default AuthWrapper;

//  old code
/*
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getUserInfo } from "../slices/userSlice";
import Loading from "../pages/Loading";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { data, isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    // if the user was logged in before, and have a token.
    if (token && !data && !isLoading) {
      dispatch(getUserInfo({ token, dispatch }));
    }
    // else if (!token) {
    //   navigate("/login", { replace: true });
    // }
  }, [token, data, isLoading, dispatch, navigate]);

  // Show a loading indicator while checking authentication status
  if (isLoading || (!data && token)) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
    // return;
  }

  return children;
};

export default AuthWrapper;
*/
