import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  isCredit: boolean;
  setIsCredit: React.Dispatch<React.SetStateAction<boolean>>;
  isDebit: boolean;
  setIsDebit: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isReverse: boolean;
  setIsReverse: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OptionsPanel({
  isCredit,
  setIsCredit,
  isDebit,
  setIsDebit,
  isOpen,
  setIsOpen,
  isReverse,
  setIsReverse,
}: Props) {
  return (
    <div
      className={
        isOpen
          ? "md:(bg-white border-black rounded-md flex flex-col gap-4 text-lg font-montserrat top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 h-25 px-2 absolute w-[45%] h-[35%] justify-center)" +
            "sm:()"
          : "hidden"
      }
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="top-3 left-4 absolute"
      >
        X
      </button>
      <div className="flex flex-row gap-4 justify-center">
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
      <div className="flex">
        <button
          className="border-black rounded-md mx-auto bg-fuchsia-500 border-2 shadow-bold-sm py-1 px-2 "
          onClick={() => setIsReverse(!isReverse)}
        >
          {isReverse ? "oldest first" : "newest first"}
        </button>
      </div>
    </div>
  );
}
