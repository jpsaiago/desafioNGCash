import { Button } from "../Button/Button";

interface Props {
  isShown: boolean;
  type: "success" | "failure" | "prompt" | "";
}

export function TransactionDialog({ isShown, type }: Props) {
  if (!isShown) {
    return <></>;
  }
  switch (type) {
    case "success":
      return (
        <div
          className="border-black rounded-md bg-green-500 border-2 h-[10%] shadow-bold-sm w-full
        transform transition-all ease-in-out items-center justify-center"
        >
          Hello from dialog!
        </div>
      );
    case "failure":
      return (
        <div
          className="border-black rounded-md bg-red-500 border-2 h-[10%] shadow-bold-sm w-full
      transform transition-all ease-in-out items-center justify-center"
        >
          Hello from dialog!
        </div>
      );
    case "prompt":
      return (
        <div
          className={`border-black rounded-md transform bg-white border-2 grid grid-cols-2 grid-rows-2 gap-1 px-2 py-2 shadow-bold-sm
      transition-all ease-in-out items-center justify-center mx-auto ${
        isShown
          ? "opacity-100 translate-y-0 h-[20%]  w-full"
          : "opacity-0 -translate-y-2 h-[10%] w-[70%]"
      }`}
        >
          <div className="h-full bg-teal-400 w-full col-span-2">
            Transfer $2.000,00 to grsaiago?
          </div>
          <Button
            bgColor="bg-lime-500 hover:bg-lime-400"
            className="mx-auto ml-auto h-[90%] mr-3
            w-2/3"
            value="confirm"
          />
          <Button
            bgColor="bg-rose-500 hover:bg-rose-400"
            className="mr-auto h-[90%] ml-3 w-2/3"
            value="cancel"
          />
        </div>
      );
    default:
      return <></>;
  }
}
