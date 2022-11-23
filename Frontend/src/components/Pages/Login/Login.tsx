import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import coinUrl from "../../../assets/coin.svg";
import { userLogin } from "../../../services/userAPI";
import { storageInfo } from "../../../utils/storageInfo";
import { FormButton } from "../../Form/FormButton";
import { Input } from "../../Form/Input";
import { CoinLogo } from "../../Helper/CoinLogo";

export default function Login() {
  //Hooks
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { data, error, isError, isLoading, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => userLogin(info.username, info.password),
    retry: false,
    onError(error, variables, context) {
      console.log(error);
      console.log(variables);
      console.log(context);
    },
    onSuccess(data) {
      storageInfo.set(data.username, data.token, data.exp);
    },
  });

  //Event handler functions
  function handleLoginInput(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInfo({ ...info, [e.currentTarget.name]: value });
  }

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex flex-row mx-auto mt-10 w-72 justify-center">
        <CoinLogo className="mx-1 w-8" fill="black" />
        <h1 className="font-bold font-montserrat mx-1 text-3xl w-40">
          challeNGe
        </h1>
      </div>
      <form
        className="flex flex-col h-2/5 my-4 w-3/4 relative justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          mutate();
        }}
      >
        <Input
          className="my-3 w-full"
          type="text"
          key={"username"}
          name="username"
          placeholder="usuário"
          value={info.username}
          onChange={handleLoginInput}
          width="w-full"
        />
        <Input
          className="my-3 w-full"
          type="password"
          key={"password"}
          name="password"
          placeholder={"senha"}
          value={info.password}
          onChange={handleLoginInput}
          width="w-full"
        />
        <FormButton
          bgColor="bg-lime-400"
          text="login"
          className="h-10 my-3 w-full"
          isLoading={isLoading}
        />
      </form>
      <div>
        <p className="font-montserrat font-bold">ainda não tem uma conta?</p>
        <FormButton
          disabled={isLoading}
          bgColor="bg-amber-400"
          text="cadastrar"
          className="my-2 transition-all"
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
}
