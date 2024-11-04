import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Icon from "../../components/Icon";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useLoginMutation } from "./authApiSlice";
import { hideEyeIcon, sideImage, viewEyeIcon } from "../../utils/constants";
import Loading from "../../components/Loading";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const state = useLocation()?.state;
  const [hidePassword, setHidePassword] = useState(true);

  const data = useAuth();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoading) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      try {
        await toast.promise(login({ email, password }).unwrap(), {
          pending: "Logging in...",
          success: {
            render({ data }) {
              return `Welcome Back ${data.data.name.split(" ")[0]}`;
            },
          },
          error: {
            render({ data }) {
              return data.data.message;
            },
          },
        });
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (data) {
      if (state) {
        navigate(state.location, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      emailRef.current.focus();
    }
  }, [data, navigate, state]);

  if (data) return <Loading />;

  return (
    <div className="flex items-center justify-center lg:justify-start mt-8 mb-32">
      <div className="lg:mr-8 xl:mr-28 hidden lg:block">
        <img
          src={sideImage}
          alt="side-image"
          className="2xl:w-[50rem] 2xl:h-[49rem] xl:w-[45rem] xl:h-[43rem] lg:w-[40rem] lg:h-[39rem] object-cover"
        />
      </div>

      <div className="px-2 w-[80%] xl:w-96 md:w-80">
        <div className="text-text2 mb-10">
          <h2 className="text-3xl sm:text-4xl font-medium mb-4">
            Log in to Exclusive
          </h2>
          <p className="text-sm sm:text-base font-Poppins">
            Enter your details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            ref={emailRef}
            placeholder="Email"
            className="h-12 outline-none border-b border-text1 text-text2 font-Poppins placeholder:text-opacity-black placeholder:text-sm"
          />

          <div className="flex items-center justify-between h-12 border-b border-text1 text-text2">
            <input
              type={hidePassword ? "password" : "text"}
              ref={passwordRef}
              placeholder="Password"
              className="h-full w-[85%] outline-none placeholder:text-opacity-black placeholder:text-sm font-Poppins"
            />
            <Icon
              icon={hidePassword ? hideEyeIcon : viewEyeIcon}
              alt="eye"
              onClick={() => setHidePassword((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              // onClick={handleLogin}
              className={`h-12 px-10 bg-secondary2 text-primary font-Poppins rounded-md hover:bg-hover-button transition-all ${
                isLoading && "bg-hover-button cursor-not-allowed"
              }`}
            >
              Log In
            </button>
            <span className="text-button2 font-Poppins cursor-pointer">
              Forget Password?
            </span>
          </div>
        </form>

        <div className="flex justify-center">
          <p className="text-primary1 font-light font-Poppins mr-4">
            Don't have an account?
          </p>
          <Link to="/signup">
            <span className="font-medium font-Poppins underline-link relative">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
