import { AnimationProps, m } from "framer-motion";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  message: string;
  type: "success" | "error" | "";
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export function TransactionAlert({
  className,
  message,
  type,
  setState,
}: Props) {
  const alertAnim: AnimationProps = {
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
      onClick={() => {
        setState(false);
      }}
      {...alertAnim}
      key={"panel"}
      className={` ${className}
      ${type == "error" ? "bg-red-300" : "bg-green-300"}
      absolute border-black h-full w-full rounded-md flex justify-center items-center 
      font-montserrat font-semibold border-2 shadow-bold-sm
      md:(relative)`}
    >
      {message}
    </m.div>
  );
}
