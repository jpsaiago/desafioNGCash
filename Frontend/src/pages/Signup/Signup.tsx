import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormButton } from "../../components/form/FormButton";
import { Input } from "../../components/form/Input";
import { CoinLogo } from "../../components/svgs/CoinLogo";
import { userSignup } from "../../services/userAPI";

export function SignUp() {
  //React Router navigation
  const navigate = useNavigate();
  //Signup action
  const { error, isSuccess, data, isLoading, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: () => userSignup(info.username, info.password),
    async onSuccess() {},
  });

  //Signup form state
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  function handleLoginInput(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInfo({ ...info, [e.currentTarget.name]: value });
  }
  const inputRules = {
    userLength: () => info.username.length >= 3,
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
    return <h1>Hey!</h1>;
  } else {
    return (
      <>
        <Link
          to={"/"}
          className="font-montserrat font-semibold text-lg top-4 left-5 text-dark-400 absolute no-underline hover:text-gray-600 "
        >
          X
        </Link>
        <div className="flex flex-row w-72 gap-2 justify-center ">
          <CoinLogo className="w-12" fill="black" />
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
            placeholder="usuário"
            value={info.username}
            onChange={handleLoginInput}
          />
          <Input
            className=" w-full"
            type="password"
            name="password"
            placeholder={"senha"}
            value={info.password}
            onChange={handleLoginInput}
          />
          <FormButton
            bgColor="bg-amber-400"
            value="cadastrar"
            className=""
            disabled={validateInputs()}
          />
        </form>
        <section className="flex font-montserrat font-bold mx-auto mt-6 text-sm w-80">
          <ul className="list-disc items-center">
            <li
              className={
                inputRules.userLength() ? "text-green-500" : "text-red-500"
              }
            >
              Your username should be at least 3 characters long
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
              Your password needs one lowercase letter, one uppercase letter and
              a number
            </li>
          </ul>
        </section>
      </>
    );
  }
}
