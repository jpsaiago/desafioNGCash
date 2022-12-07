import { PropsWithChildren } from "react";
import { BiMessageAltError } from "react-icons/bi";
import { TransactionCard } from "../TransactionCard/TransactionCard";

interface Props extends PropsWithChildren {
  transactions?: Transaction[];
  isLoading: boolean;
  isError: boolean;
}

export function TransactionList({
  transactions,
  isLoading,
  isError,
  children,
}: Props) {
  if (isError) {
    return <></>;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div
      className="flex flex-col h-full w-full pr-4 pb-8 gap-6 overflow-scroll scroll-smooth items-center
      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400"
    >
      {children}
      {transactions && transactions[0] ? (
        transactions.map((trsc, index) => (
          <TransactionCard
            key={index}
            type={trsc.type}
            value={trsc.value}
            user={trsc.from || trsc.to}
            date={new Date(trsc.createdAt)}
          />
        ))
      ) : (
        <div className="bg-white border-black rounded-md flex flex-col border-2 h-[30vh] w-full justify-center items-center">
          <BiMessageAltError size="5rem" />
          <h1 className="font-montserrat font-medium text-center text-xl">
            It looks like there's nothing here.
          </h1>
        </div>
      )}
    </div>
  );
}
