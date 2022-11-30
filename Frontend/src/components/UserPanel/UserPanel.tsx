import { useState } from "react";
import { Button } from "../Button/Button";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import { TextInput } from "../TextInput/TextInput";

interface Props {
  username: string;
  balance: number;
}

export function UserPanel({ username, balance }: Props) {
  //Form input state
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");

  return (
    <>
      <div
        className="bg-white border-black rounded-md flex flex-col
    border-2 h-[45%] shadow-bold-sm w-full p-10"
      >
        <div>
          <p className="font-montserrat font-medium text-3xl">hello,</p>
          <p className="font-montserrat font-semibold text-5xl">{username}</p>
        </div>
        <h1 className=" font-montserrat font-medium mt-auto text-6xl self-end">
          {`$${balance.toFixed(2)}`}
        </h1>
      </div>
      <form className="mt-3 w-full grid gap-4 grid-cols-3 grid-rows-2 ">
        <TextInput
          className="h-10 col-span-2"
          placeholder="input an username"
          name="target"
          state={target}
          setState={setTarget}
        />
        <CurrencyInput
          className="h-10"
          placeholder="amount"
          type="text"
          setState={setAmount}
          state={amount}
        />
        <Button
          className="h-10 col-span-3"
          bgColor="bg-yellow-300"
          value="send"
          isLoading={false}
        />
      </form>
    </>
  );
}
