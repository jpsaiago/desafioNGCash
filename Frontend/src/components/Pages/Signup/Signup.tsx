import { useState } from "react";
import { Link } from "react-router-dom";
import coinUrl from "../../../assets/coin.svg";
import { FormButton } from "../../Form/FormButton";
import { Input } from "../../Form/Input";

export default function SignUp() {
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });

  const inputRules = {
    userLength: () => info.username.length >= 3,
    passLength: () => info.password.length >= 8,
    passCharacters: () =>
      /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*){8,}$/.test(info.password),
  };

  function validateInputs() {
    return (
      inputRules.userLength() &&
      inputRules.passLength() &&
      inputRules.passCharacters()
    );
  }

  function handleLoginInput(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setInfo({ ...info, [e.currentTarget.name]: value });
  }

  return (
    <div className="flex flex-col w-full items-center">
      <Link
        to={"/login"}
        className="font-montserrat font-semibold text-lg top-4 left-5 text-dark-200 absolute no-underline hover:text-dark-50"
      >
        X
      </Link>
      <div className="flex flex-row mx-auto mt-10 w-72 justify-center">
        <img src={coinUrl} alt="" className="mx-1 w-10" />
        <h1 className="font-bold font-montserrat mx-1 text-3xl w-40">
          challeNGe
        </h1>
      </div>
      <form className="flex flex-col h-2/5 my-4 w-3/4 relative justify-center">
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
          bgColor="bg-amber-400"
          text="cadastrar"
          className="my-3"
          disabled={!validateInputs()}
        />
      </form>
      <section className="font-montserrat font-semibold text-xs w-80">
        <ul className="list-disc items-center">
          <li
            className={
              inputRules.userLength() ? "text-green-500" : "text-red-500"
            }
          >
            Seu nome de usuário precisa ter pelo menos 3 caracteres
          </li>
          <li
            className={
              inputRules.passLength() ? "text-green-500" : "text-red-500"
            }
          >
            Sua senha precisa ter pelo menos 8 caracteres
          </li>
          <li
            className={
              inputRules.passCharacters() ? "text-green-500" : "text-red-500"
            }
          >
            Sua senha precisa ter uma letra maiúscula e um número
          </li>
        </ul>
      </section>
    </div>
  );
}
