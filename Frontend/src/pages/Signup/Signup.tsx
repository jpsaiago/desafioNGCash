import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BoldButton } from "../../components/form/BoldButton";
import { Input } from "../../components/form/Input";
import { RiCopperCoinFill } from "react-icons/ri";
import { HiCheckCircle, HiXCircle } from "react-icons/hi2";
import { userSignup } from "../../services/userAPI";
import { AxiosError } from "axios";

export function SignUp() {
  //React Router navigation
  const navigate = useNavigate();

  //API request and error handling
  const { error, isError, isSuccess, data, isLoading, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => userSignup(info.username, info.password),
    async onSuccess() {},
  });
  function errorMessage(e: unknown) {
    //Type check needed to satisfy Typescript
    if (error instanceof AxiosError) {
      if (error.response?.data.message) {
        return error.response.data.message;
      } else {
        return "Unable to signup, please try again.";
      }
    }
  }

  //Signup form state and signup rules
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
    passCharacters: () =>
      /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/.test(info.password),
  };
  function validateInputs() {
    return (
      !inputRules.userLength() ||
      !inputRules.passLength() ||
      !inputRules.passCharacters()
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col h-2/3 mt-6 justify-center items-center">
        <HiCheckCircle size="8 rem" />
        <h1 className="font-montserrat font-medium mt-4 text-xl">
          User jpsaiago registered successfully!
        </h1>
        <BoldButton
          onClick={() => location.reload()}
          className="mt-4"
          bgColor="bg-rose-500 hover:bg-rose-400"
          value="login"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col h-2/3 mt-6 justify-center items-center">
        <HiXCircle size="8rem" />
        <h1 className="font-montserrat font-medium mt-4 text-xl">
          {errorMessage(error)}
        </h1>
        <BoldButton
          className="mt-4"
          bgColor="bg-rose-500 hover:bg-rose-400"
          value="go back"
          onClick={() => location.reload()}
        />
      </div>
    );
  }

  return (
    <>
      <Link
        to={"/"}
        className="font-montserrat font-semibold text-lg top-4 left-5 text-dark-400 absolute no-underline hover:text-gray-600 "
      >
        X
      </Link>
      <div className="flex flex-row w-72 gap-2 justify-center items-center">
        <RiCopperCoinFill size="2.8rem" />
        <h1 className="font-bold font-montserrat my-auto text-4xl">
          challeNGe
        </h1>
      </div>
      <form
        className="flex flex-col h-[40%] mt-8 w-full relative justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <Input
          className=" w-full"
          type="text"
          name="username"
          placeholder="username"
          value={info.username}
          onChange={handleLoginInput}
        />
        <Input
          className=" w-full"
          type="password"
          name="password"
          placeholder="password"
          value={info.password}
          onChange={handleLoginInput}
        />
        <BoldButton
          bgColor="bg-sky-500 enabled:hover:bg-sky-400"
          value="signup"
          className="h-10 w-full"
          disabled={validateInputs()}
          isLoading={isLoading}
        />
      </form>
      <section className="flex font-montserrat font-bold mx-auto mt-6 text-sm w-80">
        <ul className="list-disc items-center">
          <li
            className={
              inputRules.userLength() ? "text-green-500" : "text-red-500"
            }
          >
            Your username should be at least 3 characters long with no spaces
          </li>
          <li
            className={
              inputRules.passLength() ? "text-green-500" : "text-red-500"
            }
          >
            Your password should be at least 8 characters long
          </li>
          <li
            className={
              inputRules.passCharacters() ? "text-green-500" : "text-red-500"
            }
          >
            Your password needs one lowercase letter, one uppercase letter and a
            number
          </li>
        </ul>
      </section>
    </>
  );
}
