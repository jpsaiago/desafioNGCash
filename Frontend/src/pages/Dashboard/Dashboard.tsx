import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormButton } from "../../components/form/FormButton";
import { Input } from "../../components/form/Input";
import { CoinLogo } from "../../components/svgs/CoinLogo";
import { TransactionCard } from "../../components/TransactionCard/TransactionCard";
import { storageInfo } from "../../utils/storageInfo";
import "./background.css";

export function Dashboard() {
  const navigate = useNavigate();

  //Transfer form state
  const [ammount, setAmmount] = useState("");
  const [target, setTarget] = useState("");
  function handleTargetInput(e: React.FormEvent<HTMLInputElement>) {
    setTarget(e.currentTarget.value);
  }
  function handleAmmountInput(e: React.FormEvent<HTMLInputElement>) {
    if (Number(e.currentTarget.value)) {
      setAmmount(e.currentTarget.value);
    }
    if (!e.currentTarget.value) {
      setAmmount("");
    }
  }

  const userProfile = storageInfo.get();

  return (
    <div
      id="dashboard"
      className="md:(h-[100vh] grid w-[100vw] gap-0 grid-cols-[40vw 60vw] grid-rows-[10vh 85vh 5vh] ) "
    >
      <div className="bg-black flex flex-row h-10vh col-span-2 align-center justify-between">
        <div className="flex my-auto w-72 justify-center">
          <CoinLogo className="mx-1 w-10" fill="#ffffff" />
          <h1 className="font-bold font-montserrat mx-1 text-white text-3xl w-40">
            challeNGe
          </h1>
        </div>
        <button
          className="font-montserrat text-white"
          onClick={() => {
            window.localStorage.clear();
            navigate("/");
          }}
        >
          sair
        </button>
      </div>
      <div className="ml-[5vw] w-40vw">
        <div
          className="bg-white border-black rounded-md flex flex-col mx-auto 
        border-2 h-[45%] shadow-bold-sm mt-16 p-10 w-[80%]"
        >
          <div className="mb-auto">
            <p className="font-montserrat font-medium text-3xl">olá,</p>
            <p className="font-montserrat font-semibold text-5xl">
              {`${userProfile.username}!`}
            </p>
          </div>
          <h1 className=" font-montserrat font-medium mt-auto text-6xl self-end">
            $130.000,00
          </h1>
        </div>
        <form className="mx-auto mt-3 w-full grid w-[80%] gap-4 grid-cols-3 grid-rows-2">
          <Input
            className="h-10 col-span-2"
            placeholder="insira um nome de usuário"
            name="target"
            value={target}
            onChange={handleTargetInput}
          />
          <Input
            className="h-10"
            placeholder="valor"
            name="ammount"
            value={ammount}
            onChange={handleAmmountInput}
          />
          <FormButton
            className="h-10 w-full col-span-3"
            bgColor="bg-yellow-300"
            value="transferir"
            isLoading={false}
          />
        </form>
      </div>
      <div className="flex mr-[5vw] w-50vw overflow-auto">
        <div className="bg-white border-black rounded-md mx-auto border-2 h-1/5 shadow-bold-sm mt-16 w-[30%]">
          <div className="flex">
            <input type="checkbox" />
            <p>Teste</p>
          </div>
        </div>
        <div className="flex flex-col mt-16 pr-4 w-[55%] gap-6 overflow-auto">
          <TransactionCard key={1} type="credit" />
          <TransactionCard key={2} type="credit" />
          <TransactionCard key={3} type="credit" />
          <TransactionCard key={4} type="debit" />
          <TransactionCard key={5} type="debit" />
          <TransactionCard key={6} type="credit" />
        </div>
      </div>
      <div className="bg-black flex font-montserrat h-5vh text-xs text-light-50 col-span-2 row-start-3 justify-center items-center self-end">
        <p className="">
          Esse site é um projeto sem fins lucrativos desenvolvido para o
          processo seletivo da NG Cash
        </p>
      </div>
    </div>
  );
}
