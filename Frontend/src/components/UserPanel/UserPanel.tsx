import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { queryClient } from "../../App";
import { transactionAPI } from "../../services/transactionAPI";
import { Button } from "../Button/Button";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import { TextInput } from "../TextInput/TextInput";
import { TransactionDialog } from "../TransactionDialog/TransactionDialog";

interface Props {
  username: string;
  balance: number;
  userToken: string;
}
export function UserPanel({ username, balance, userToken }: Props) {
  //Form input state
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  const amountWithDecimals = (Number(amount) / 100).toFixed(2);

  //Return state
  const [showDialog, setShowDialog] = useState(false);
  const TransactionApi = useMutation({
    mutationFn: async () =>
      await transactionAPI.create(userToken, target, amountWithDecimals),
    retry: false,
    mutationKey: ["new transaction"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountInfo"] });
    },
    onSettled: () => {
      if (TransactionApi.isError) {
      }
      if (TransactionApi.isSuccess) {
      }
    },
  });

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
      <form
        className="my-4 w-full grid gap-4 grid-cols-3 grid-rows-2 "
        onSubmit={(e) => {
          e.preventDefault();
          TransactionApi.mutate();
        }}
      >
        <TextInput
          className="h-10 col-span-2"
          placeholder="input an username"
          name="target"
          value={target}
          onChange={(e) => setTarget(e.currentTarget.value)}
        />
        <CurrencyInput
          className="h-10"
          placeholder="amount"
          type="text"
          setValue={setAmount}
          value={amount}
        />
        <Button
          disabled={!target || !amount}
          className="h-10 col-span-3"
          bgColor="bg-yellow-300"
          value="send"
          isLoading={TransactionApi.isLoading}
        />
      </form>
      <button
        className="bg-red-400 h-10 w-30"
        onClick={() => {
          setShowDialog(!showDialog);
        }}
      >
        teste
      </button>
      <TransactionDialog isShown={showDialog} type={"prompt"} />
    </>
  );
}
