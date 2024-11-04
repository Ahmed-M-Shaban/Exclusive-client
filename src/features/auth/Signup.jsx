import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Icon from "../../components/Icon";
import { sideImage } from "../../utils/constants";
import { viewEyeIcon, hideEyeIcon } from "../../utils/constants";
import Loading from "../../components/Loading";
import { useSignupMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfPassword, setHideConfPassword] = useState(true);

  const data = useAuth();
  const [signup, { isLoading }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoading) {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const passwordConfirm = passwordConfRef.current.value;

      if (password !== passwordConfirm)
        return toast.error(
          "password and password confirmation are not the same"
        );

      try {
        await toast.promise(
          signup({ name, email, password, passwordConfirm }).unwrap(),
          {
            pending: "Working on your account...",
            success: {
              render({ data }) {
                return `Congratulations ${
                  data.data.name.split(" ")[0]
                }, your account created successfully.`;
              },
            },
            error: {
              render({ data }) {
                return data.data.message;
              },
            },
          }
        );
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (data) {
      navigate("/", { replace: true });
    } else {
      nameRef.current.focus();
    }
  }, [data, navigate]);

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
            Create an account
          </h2>
          <p className="text-sm sm:text-base">Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            ref={nameRef}
            placeholder="Name"
            className="h-12 outline-none border-b border-text1 text-text2 placeholder:text-opacity-black placeholder:text-sm"
          />

          <input
            type="text"
            ref={emailRef}
            placeholder="Email"
            className="h-12 outline-none border-b border-text1 text-text2 placeholder:text-opacity-black placeholder:text-sm"
          />

          <div className="flex items-center justify-between h-12 border-b border-text1 text-text2">
            <input
              type={hidePassword ? "password" : "text"}
              ref={passwordRef}
              placeholder="Password"
              className="h-full w-[85%] outline-none placeholder:text-opacity-black placeholder:text-sm"
            />
            <Icon
              icon={hidePassword ? hideEyeIcon : viewEyeIcon}
              alt="eye"
              onClick={() => setHidePassword((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between h-12 border-b border-text1 text-text2">
            <input
              type={hideConfPassword ? "password" : "text"}
              ref={passwordConfRef}
              placeholder="Password"
              className="h-full w-[85%] outline-none placeholder:text-opacity-black placeholder:text-sm"
            />
            <Icon
              icon={hideConfPassword ? hideEyeIcon : viewEyeIcon}
              alt="eye"
              onClick={() => setHideConfPassword((prev) => !prev)}
            />
          </div>
          <button
            type="submit"
            className={`h-12 bg-secondary2 text-primary rounded-md mt-6 hover:bg-hover-button transition-all ${
              isLoading && "bg-hover-button cursor-not-allowed"
            }`}
          >
            Create Account
          </button>
        </form>

        <div className="flex justify-center">
          <p className="text-primary1 font-light mr-4">Already have account?</p>
          <Link to="/login">
            <span className="font-medium underline-link relative">Log in</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
