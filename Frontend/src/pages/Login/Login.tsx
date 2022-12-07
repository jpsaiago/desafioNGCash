import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AnimationProps, m } from "framer-motion";
import { useEffect, useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { RiCopperCoinFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { TextInput } from "../../components/TextInput/TextInput";
import { userAPI } from "../../services/userAPI";
import "../../style/authBackground.css";
import { storageInfo } from "../../utils/storageInfo";

export function Login() {
  //React Router navigation
  const navigate = useNavigate();

  //Login submit
  function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginError({
      ...loginError,
      isError: "",
    });
    //Timeout between submits to indicate to the user that it fired again
    setTimeout(() => {
      //Manual custom error
      if (!username) {
        setLoginError({
          isError: "username",
          message: "Please provide an username",
        });
        return;
      }
      if (!password) {
        setLoginError({
          isError: "password",
          message: "Please provide a password",
        });
        return;
      }
      loginApi.mutate();
    }, 250);
  }

  //API request and error handling
  const loginApi = useMutation({
    mutationFn: async () => await userAPI.login(username, password),
    retry: false,
    async onSuccess(data) {
      await storageInfo.set(data.username, data.token, data.exp);
      navigate("dashboard");
    },
    onError(e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.message) {
          setLoginError({
            isError: "api",
            message: e.response.data.message,
          });
          return;
        }
      }
      setLoginError({
        isError: "api",
        message: "Unable to login, please try again later.",
      });
    },
  });
  interface LoginError {
    isError: "api" | "password" | "username" | "";
    message: string;
  }
  //Manually control error state to allow for pre api calls error states and custom messages
  const [loginError, setLoginError] = useState<LoginError>({
    isError: "",
    message: "",
  });

  //Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Redirect if user is already authenticated
  useEffect(() => {
    const userSession = storageInfo.get();
    if (userSession.token && userSession.tokenExp && userSession.username) {
      if (Number(userSession.tokenExp) >= new Date().getTime()) {
        return navigate("/dashboard");
      }
    }
  }, []);

  const signupAnim: AnimationProps = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.3,
      },
    },
  };

  const loginAnim: AnimationProps = {
    initial: {
      x: "100%",
    },
    exit: {
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <m.div
        initial={loginAnim.initial}
        exit={loginApi.isSuccess ? loginAnim.exit : {}}
        className="bg-black top-0 right-0 bottom-0 left-0 z-10 fixed"
      />
      <div
        className="bg-white flex flex-col h-[100vh] py-14 px-12 w-[100vw] justify-center items-center
      md:(h-[80vh] rounded-lg my-[10vh] mx-auto w-[30vw] min-w-40 justify-start) "
      >
        <m.div {...(loginApi.isSuccess ? null : signupAnim)} className="w-full">
          <div className="flex flex-row mt-[3vh] gap-2 justify-center items-center">
            <RiCopperCoinFill className="h-[7vh] max-h-24 w-[7vh]" />
            <h1 className="font-bold font-montserrat my-auto text-[5vh]">
              challeNGe
            </h1>
          </div>
          <form
            className="flex flex-col h-[25vh] mt-[4vh] w-full justify-between items-center"
            onSubmit={handleSubmitLogin}
          >
            <TextInput
              className="h-12 h-max-[6vh] w-full"
              isError={loginError.isError == "username"}
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
            <div className="flex h-12 h-max-[6vh] shadow w-full relative">
              <TextInput
                className="h-full w-full"
                isError={loginError.isError == "password"}
                type={showPassword ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <div
                className="cursor-pointer flex h-full right-3 absolute items-center md:(w-1/12) "
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <HiOutlineEye className="h-6 w-6 md:(h-full w-full transition-colors stroke-gray-600 hover:stroke-gray-400) " />
                ) : (
                  <HiOutlineEyeSlash className="h-6 w-6 md:(h-full w-full transition-colors stroke-gray-600 hover:stroke-gray-400) " />
                )}
              </div>
            </div>
            <Button
              bgColor="bg-lime-500 hover:bg-lime-300"
              value="login"
              className="h-[6vh] h-max-12 text-2xl w-[30%] md:(text-xl ) "
              isLoading={loginApi.isLoading}
            />
          </form>
          <div
            className={`h-10 mt-5 w-full transition-all transform duration-500 flex flex-col justify-center ${
              loginError.isError != ""
                ? "translate-y-0 opacity-100"
                : "translate-y-3 opacity-0"
            }`}
          >
            <p className="font-montserrat font-medium text-center text-red-600">
              {loginError.message}
            </p>
          </div>
          <div className="mt-4">
            <p className="font-montserrat font-bold text-xl text-center md:(text-base)">
              don't have an account?
            </p>
            <Button
              disabled={loginApi.isLoading}
              bgColor="bg-amber-500 hover:enabled:bg-amber-400"
              value="sign-up"
              className="mx-auto h-[6vh] h-max-12 mt-2 transition-all text-2xl w-[50vw] md:(w-[50%] text-xl) "
              onClick={() => navigate("/signup")}
            />
          </div>
        </m.div>
      </div>
    </>
  );
}
