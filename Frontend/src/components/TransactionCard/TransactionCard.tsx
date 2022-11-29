import { useEffect } from "react";
import { HiDownload, HiUpload } from "react-icons/hi";

interface Props {
  type: "credit" | "debit";
}
export function TransactionCard({ type }: Props) {
  return (
    <div
      className={`${type == "credit" ? "bg-green-400" : "bg-red-400"}
      border-black rounded-md font-montserrat font-semibold border-2
      h-28 shadow-bold-sm w-full grid p-6 grid-cols-3 grid-rows-1`}
    >
      <div className="flex flex-col place-content-around">
        <p>grsaiago</p>
        <p>25/11/2022</p>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-3xl">$25,00</p>
      </div>
      <div className="flex items-center justify-center">
        {type == "credit" ? (
          <HiDownload size={"2.8rem"} />
        ) : (
          <HiUpload size={"2.8rem"} />
        )}
      </div>
    </div>
  );
}
