import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormButton } from "../../components/form/FormButton";
import { Input } from "../../components/form/Input";
import { CoinLogo } from "../../components/svgs/CoinLogo";
import { userLogin } from "../../services/userAPI";
import { storageInfo } from "../../utils/storageInfo";

export function Login() {
  //React Router navigation
  const navigate = useNavigate();

  //API request and error handling
  const { isLoading, error, isError, mutate } = useMutation({
    mutationFn: () => userLogin(info.username, info.password),
    retry: false,
    async onSuccess(data) {
      await storageInfo.set(data.username, data.token, data.exp);
      navigate("/dashboard");
    },
    onError(e) {
      console.log(e);
    },
  });
  function errorMessage(e: unknown) {
    //Type check needed to satisfy Typescript
    if (error instanceof AxiosError) {
      if (error.response?.data.message) {
        return error.response.data.message;
      } else {
        return "Unable to log-in, please try again later.";
      }
    }
  }

  //Login form state
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  function handleLoginInput(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInfo({ ...info, [e.currentTarget.name]: value });
  }

  return (
    <>
      <div className="flex flex-row w-72 gap-2 justify-center ">
        <CoinLogo className="w-12" fill="black" />
        <h1 className="font-bold font-montserrat my-auto text-4xl">
          challeNGe
        </h1>
      </div>
      <form
        className="flex flex-col h-[40%] mt-8 w-full justify-between"
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
        <FormButton
          bgColor="bg-lime-400"
          value="login"
          className="h-10 w-full"
          isLoading={isLoading}
        />
      </form>
      <div className="h-7 mt-2 w-full">
        {isError ? (
          <p className="font-montserrat font-medium text-center text-red-600">
            {`${errorMessage(error)}`}
          </p>
        ) : null}
      </div>
      <div className="mt-4">
        <p className="font-montserrat font-bold text-center">
          don't have an account?
        </p>
        <FormButton
          disabled={isLoading}
          bgColor="bg-amber-400"
          value="sign-up"
          className="mt-2 transition-all"
          onClick={() => navigate("/signup")}
        />
      </div>
    </>
  );
}
