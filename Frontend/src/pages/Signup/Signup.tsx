import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AnimationProps, m, Variants } from "framer-motion";
import { useState } from "react";
import { HiArrowUturnLeft, HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { RiCopperCoinFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { TextInput } from "../../components/TextInput/TextInput";
import { userAPI } from "../../services/userAPI";
import "../../style/authBackground.css";

export function SignUp() {
  //React Router navigation
  const navigate = useNavigate();

  //API request and error handling
  const signupAPI = useMutation({
    mutationKey: ["signup"],
    mutationFn: async () => await userAPI.signup(info.username, info.password),
  });
  function errorMessage(e: unknown) {
    //Type check needed to satisfy Typescript
    if (signupAPI.error instanceof AxiosError) {
      if (signupAPI.error.response?.data.message) {
        return signupAPI.error.response.data.message;
      } else {
        return "Unable to signup, please try again.";
      }
    }
  }

  //Sign-up form state and sign-up rules
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  function handleLoginInput(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInfo({ ...info, [e.currentTarget.name]: value });
  }

  const inputRules = {
    userLength: () => info.username.length >= 3 && !info.username.includes(" "),
    passLength: () => info.password.length >= 8,
    passUpper: () => /[A-Z]/.test(info.password),
    passNumber: () => /\d/.test(info.password),
  };

  function validateInputs() {
    return (
      !inputRules.userLength() ||
      !inputRules.passLength() ||
      !inputRules.passNumber() ||
      !inputRules.passUpper()
    );
  }

  //Success animation variants and rules
  const containerVar: Variants = {
    initial: {
      scaleY: 0,
      originY: 1,
    },
    animate: {
      scaleY: 1,
      transition: {
        ease: "easeInOut",
        when: "beforeChildren",
        duration: 0.6,
        delayChildren: 0.1,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        ease: "easeInOut",
        when: "afterChildren",
        duration: 0.6,
        delayChildren: 0.1,
      },
    },
  };
  const contentVar: Variants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.8,
      },
    },
  };

  if (signupAPI.isSuccess) {
    return (
      <div
        className="bg-white flex flex-col h-[100vh] w-[100vw] overflow-hidden
      md:(h-[80vh] rounded-lg my-[10vh] mx-auto w-[30vw] min-w-40) "
      >
        <m.div
          key={"container"}
          variants={containerVar}
          initial="initial"
          animate="animate"
          exit="exit"
          className="bg-teal-600 h-[100vh]  w-[100vw]
        md:(h-full rounded-lg w-full py-14 px-10) "
        >
          <m.div
            key={"content"}
            variants={contentVar}
            className="flex flex-col h-[100vh]  w-[100vw]
          gap-[4%] justify-center items-center
          md:(h-full rounded-lg w-full py-14 px-10) "
          >
            <HiCheckCircle
              size="100%"
              className="h-[30vw] fill-white w-[30vw] md:(h-[9vw] w-[9vw]) "
            />
            <h1 className="font-montserrat font-bold text-white text-center text-3xl md:text-xl">
              {signupAPI.data.message}
            </h1>
            <Button
              className="text-3xl md:(text-xl mt-2) "
              onClick={() => navigate("/")}
              bgColor="bg-white hover:bg-emerald-400"
              value="login"
            />
          </m.div>
        </m.div>
      </div>
    );
  }

  if (signupAPI.isError) {
    if (signupAPI.error instanceof AxiosError) {
      return (
        <div
          className="bg-white flex flex-col h-[100vh] w-[100vw] overflow-hidden
      md:(h-[80vh] rounded-lg my-[10vh] mx-auto w-[30vw] min-w-40) "
        >
          <m.div
            key={"container"}
            variants={containerVar}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-rose-600 h-[100vh]  w-[100vw]
        md:(h-full rounded-lg w-full py-14 px-10) "
          >
            <m.div
              key={"content"}
              variants={contentVar}
              className="flex flex-col h-[100vh]  w-[100vw]
          gap-[4%] justify-center items-center
          md:(h-full rounded-lg w-full py-14 px-10) "
            >
              <HiXCircle
                size="100%"
                className="h-[30vw] fill-white w-[30vw] md:(h-[7vw] w-[7vw]) "
              />
              <h1 className="font-montserrat font-bold text-white text-center text-3xl md:text-xl">
                {signupAPI.error.response?.data.message ??
                  "Unable to sign-up, please try again."}
              </h1>
              <Button
                className="text-3xl md:(text-xl mt-2) "
                onClick={() => navigate("/")}
                bgColor="bg-white hover:bg-emerald-400"
                value="login"
              />
            </m.div>
          </m.div>
        </div>
      );
    } else return <></>;
  }

  const animation: AnimationProps = {
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

  return (
    <div
      className="bg-white flex flex-col h-[100vh] w-[100vw] items-center
      md:(h-[80vh] rounded-lg my-[10vh] mx-auto w-[30vw] min-w-40 justify-start) "
    >
      <m.div
        className="flex flex-col h-full w-full py-14 px-12 relative justify-center md:justify-start"
        layout
        {...animation}
      >
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex font-montserrat font-semibold text-lg top-8 left-8 
          text-gray-700 gap-2 absolute no-underline items-center hover:text-gray-500"
        >
          <HiArrowUturnLeft />
          <p>back</p>
        </div>
        <div className="flex flex-row gap-2 justify-center items-center md:mt-[3vh]">
          <RiCopperCoinFill className="h-[7vh] max-h-24 w-[7vh]" />
          <h1 className="font-bold font-montserrat my-auto text-[5vh]">
            challeNGe
          </h1>
        </div>
        <form
          className="flex flex-col h-[60%] mt-[4vh] w-full max-h-[40vh] gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            await signupAPI.mutateAsync();
          }}
        >
          <TextInput
            className="h-12 h-max-[6vh] w-full"
            type="text"
            name="username"
            placeholder="username"
            value={info.username}
            onChange={handleLoginInput}
          />
          <ul
            className="flex flex-col font-montserrat font-bold list-disc mx-auto text-sm
            leading-tight w-[80%] md:text-[0.8rem]"
          >
            <li
              className={
                inputRules.userLength() ? "text-green-500" : "text-red-500"
              }
            >
              Should be at least 3 characters long with no spaces
            </li>
          </ul>
          <TextInput
            className="h-12 h-max-[6vh] w-full"
            type="password"
            name="password"
            placeholder="password"
            value={info.password}
            onChange={handleLoginInput}
          />
          <ul
            className="flex flex-col font-montserrat font-bold list-disc mx-auto text-sm leading-tight
            w-[80%] md:text-[0.8rem]"
          >
            <li
              className={
                inputRules.passLength() ? "text-green-500" : "text-red-500"
              }
            >
              Should be at least 8 characters long
            </li>
            <li
              className={
                inputRules.passNumber() ? "text-green-500" : "text-red-500"
              }
            >
              Should have at least one number
            </li>
            <li
              className={
                inputRules.passUpper() ? "text-green-500" : "text-red-500"
              }
            >
              Should have at least one uppercase letter
            </li>
          </ul>
          <Button
            bgColor="bg-sky-500 enabled:hover:bg-sky-400"
            value="signup"
            className="mx-auto mt-2 transition-all h-10 text-2xl w-[50vw] md:(w-[50%] text-xl) "
            disabled={validateInputs()}
            isLoading={signupAPI.isLoading}
          />
        </form>
      </m.div>
    </div>
  );
}
