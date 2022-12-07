import { AnimatePresence, m, Variants } from "framer-motion";
import { PropsWithChildren } from "react";
import { TbSortAscending, TbSortDescending } from "react-icons/tb";
import { Button } from "../Button/Button";

interface Props extends PropsWithChildren {
  isCredit: boolean;
  setIsCredit: React.Dispatch<React.SetStateAction<boolean>>;
  isDebit: boolean;
  setIsDebit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isReverse: boolean;
  setIsReverse: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FilterPanel({
  isCredit,
  isDebit,
  isReverse,
  setIsCredit,
  setIsDebit,
  setIsReverse,
  setIsOpen,
}: Props) {
  const panelAnim: Variants = {
    hidden: {
      scale: 0.6,
      opacity: 0,
      y: -50,
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeOut",
        duration: 0.2,
      },
    },
    exit: {
      scale: 0.6,
      opacity: 0,
      y: -50,
      transition: {
        ease: "easeIn",
        duration: 0.2,
      },
    },
  };

  const bgAnim: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        ease: "linear",
        duration: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: "linear",
        duration: 0.1,
        when: "afterChildren",
      },
    },
  };

  return (
    <m.div
      key="background"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={bgAnim}
      className="bg-black rounded-t-md bg-opacity-50 h-[99%] w-[86%] absolute"
    >
      <m.div
        key="panel"
        variants={panelAnim}
        className=" md:(bg-white border-black rounded-md flex flex-col gap-2 text-lg font-montserrat shadow-bold-sm
            left-1/4 top-1/6 border-2 px-2 absolute w-[45%] h-[30%] justify-center) "
      >
        <button
          onClick={() => setIsOpen(false)}
          className="top-3 left-4 absolute"
        >
          X
        </button>
        <div className="flex flex-row gap-3 justify-center">
          <div className="flex gap-1 items-center ">
            <input
              className="rounded-md border-2 h-5 w-5 hover:border-green-500 focus:(ring-0)
                checked:(bg-green-500 focus:bg-green-500 hover:bg-green-400) "
              checked={isCredit}
              name="credit"
              type="checkbox"
              onChange={() => setIsCredit(!isCredit)}
            />
            <p>credit</p>
          </div>
          <div className="flex gap-1 items-center">
            <input
              className="rounded-md border-2 h-5 w-5 hover:border-red-500 focus:(ring-0)
                checked:(bg-red-500 focus:bg-red-500 hover:bg-red-400) "
              checked={isDebit}
              name="credit"
              type="checkbox"
              onChange={() => setIsDebit(!isDebit)}
            />
            <p>debit</p>
          </div>
        </div>
        <Button
          bgColor="bg-fuchsia-400 "
          onClick={() => setIsReverse(!isReverse)}
        >
          {isReverse ? (
            <div className="flex justify-center items-center">
              <TbSortDescending size={"1.5rem"} />
              <p> oldest first</p>
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <TbSortAscending size={"1.5rem"} />
              <p>newest first</p>
            </div>
          )}
        </Button>
      </m.div>
    </m.div>
  );
}
