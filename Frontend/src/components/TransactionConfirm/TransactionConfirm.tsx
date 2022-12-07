import { UseMutateFunction } from "@tanstack/react-query";
import { AnimationProps, m } from "framer-motion";
import { HTMLProps } from "react";
import { currencyFormatter } from "../../utils/currencyFormat";
import { Button } from "../Button/Button";

interface Props extends HTMLProps<HTMLDivElement> {
  target: string;
  amount: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate: UseMutateFunction<Transaction, unknown, void, unknown>;
}

export function TransactionConfirm({
  target,
  amount,
  setOpen,
  mutate,
  className,
}: Props) {
  const formatAmount = currencyFormatter.format(
    Number((Number(amount) / 100).toFixed(2))
  );

  const dialogAnim: AnimationProps = {
    initial: {
      opacity: 0,
      x: 50,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        ease: "easeIn",
        duration: 0.2,
      },
    },
  };
  return (
    <m.div
      {...dialogAnim}
      key={"panel"}
      className={` ${className} bg-white border-black rounded-md border-2 shadow-bold-sm grid grid-cols-2 grid-rows-2`}
    >
      <p className="flex font-montserrat font-semibold text-lg gap-1 col-span-2 justify-center">
        Transfer
        <span className="text-fuchsia-600">{`${formatAmount}`}</span>
        to
        <span className="text-fuchsia-600">{`${target}?`}</span>
      </p>
      <Button
        className="mx-auto w-[80%]"
        bgColor="bg-lime-300"
        value={"confirm"}
        onClick={async () => {
          setOpen(false);
          await mutate();
        }}
      />
      <Button
        className="mx-auto w-[80%]"
        bgColor="bg-red-300"
        value={"cancel"}
        onClick={() => {
          setOpen(false);
        }}
      />
    </m.div>
  );
}
