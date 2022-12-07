import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { queryClient } from "../../App";
import { transactionAPI } from "../../services/transactionAPI";
import { currencyFormatter } from "../../utils/currencyFormat";
import { Button } from "../Button/Button";
import { CurrencyInput } from "../CurrencyInput/CurrencyInput";
import { TextInput } from "../TextInput/TextInput";
import { TransactionAlert } from "../TransactionAlert/TransactionAlert";
import { TransactionConfirm } from "../TransactionConfirm/TransactionConfirm";

interface Props {
  username: string;
  balance: number;
  userToken: string;
}
export function UserPanel({ username, balance, userToken }: Props) {
  //Form input state
  const [amount, setAmount] = useState("");
  const [target, setTarget] = useState("");
  //Separate formatted value to avoid inputting decimal places and other symbols
  const amountWithDecimals = (Number(amount) / 100).toFixed(2);

  interface ResultData {
    message: string;
    type: "" | "error" | "success";
  }
  //New transaction state
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultData, setResultData] = useState<ResultData>({
    message: "",
    type: "",
  });

  //Api mutation
  const newTransaction = useMutation({
    mutationFn: async () =>
      await transactionAPI.create(userToken, target, amountWithDecimals),
    retry: false,
    mutationKey: ["new transaction"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accountInfo"] });
      setShowResultDialog(true);
      setResultData({
        type: "success",
        message: `Sent
        ${currencyFormatter.format(Number(amountWithDecimals))}
        to ${target}!`,
      });
      setTimeout(() => {
        setShowResultDialog(false);
      }, 4000);
    },
    onError: (e) => {
      queryClient.invalidateQueries({ queryKey: ["accountInfo"] });
      if (e instanceof AxiosError) {
        setShowResultDialog(!showResultDialog);
        setResultData({ type: "error", message: e.response?.data.message });
        //Wait 5 seconds and disable notification
        setTimeout(() => {
          setShowResultDialog(false);
        }, 4000);
      } else {
        setShowResultDialog(!showResultDialog);
        setResultData({
          type: "error",
          message: "Transaction failed, please try again.",
        });
        //Wait 5 seconds and disable notification
        setTimeout(() => {
          setShowResultDialog(false);
        }, 4000);
      }
    },
  });

  return (
    <>
      <div
        className="bg-white border-black rounded-md flex flex-col
        border-2 h-[60%] shadow-bold-sm w-full p-5 md:(p-10 h-[45%]) "
      >
        <div>
          <p className="font-montserrat font-medium text-2xl md:(text-3xl)">
            hello,
          </p>
          <p className="font-montserrat font-semibold text-3xl md:(text-5xl)">
            {username}
          </p>
        </div>
        <h1 className=" font-montserrat font-medium mt-auto text-4xl self-end md:(text-6xl)">
          {currencyFormatter.format(Number(balance.toFixed(2)))}
        </h1>
      </div>
      <form
        className=" mt-2 w-full grid gap-2 grid-cols-3 grid-rows-2 md:(gap-4 my-4) "
        onSubmit={(e) => {
          e.preventDefault();
          setShowConfirmDialog(true);
        }}
      >
        <TextInput
          disabled={showConfirmDialog}
          className="h-10 col-span-3 md:(col-span-2)"
          placeholder="input an username"
          name="target"
          value={target}
          onChange={(e) => setTarget(e.currentTarget.value)}
        />
        <CurrencyInput
          disabled={showConfirmDialog}
          className="h-10 col-span-2 md:(col-span-1)"
          placeholder="amount"
          type="text"
          setValue={setAmount}
          value={amount}
        />
        <Button
          disabled={!target || !amount || showConfirmDialog}
          className="h-10 md:(col-span-3)"
          bgColor="bg-yellow-300"
          value="send"
          isLoading={newTransaction.isLoading}
        />
      </form>
      <AnimatePresence>
        {showConfirmDialog && (
          <TransactionConfirm
            className="mx-auto h-[20%] p-8 w-[80%] absolute md:(relative h-[25%] w-full py-4 px-0) "
            key="dialog"
            target={target}
            amount={amount}
            mutate={newTransaction.mutateAsync}
            setOpen={setShowConfirmDialog}
          />
        )}
        {showResultDialog && (
          <TransactionAlert
            className="h-[8%] w-[80%] md:(w-full h-[10%])"
            type={resultData.type}
            message={resultData.message}
            setState={setShowResultDialog}
          />
        )}
      </AnimatePresence>
    </>
  );
}
