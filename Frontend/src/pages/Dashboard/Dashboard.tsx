import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { BsExclamationCircleFill } from "react-icons/bs";
import { RiCopperCoinFill, RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoFilter } from "react-icons/io5";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { TransactionList } from "../../components/TransactionList/TransactionList";
import { UserPanel } from "../../components/UserPanel/UserPanel";
import { userAPI } from "../../services/userAPI";
import { storageInfo } from "../../utils/storageInfo";
import "./background.css";

export function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userProfile = storageInfo.get();

  //Get user account info from server
  const accountInfo = useQuery({
    queryKey: ["accountInfo"],
    queryFn: async () => await userAPI.getInfo(`${storageInfo.get().token}`),
    staleTime: 1000 * 60 * 3, //3 minutes of staleTime between fetches
  });

  //Filter panel state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  //Array filter states
  const [isCredit, setIsCredit] = useState(true);
  const [isDebit, setIsDebit] = useState(true);
  const [isReverse, setIsReverse] = useState(false);

  //Filter and order transactions, every time the component re-renders these are calculated again
  const filteredTransactions: Transaction[] = [];
  accountInfo.data?.transactions.map((trsc) => {
    if (isCredit && isDebit) {
      filteredTransactions.push(trsc);
    } else {
      if (isCredit && trsc.type == "credit") {
        filteredTransactions.push(trsc);
      }
      if (isDebit && trsc.type == "debit") {
        filteredTransactions.push(trsc);
      }
    }
  });
  if (isReverse) {
    filteredTransactions.reverse();
  }

  //Clear cache data to avoid access from different logged user
  function logOut() {
    window.localStorage.clear();
    queryClient.invalidateQueries({ queryKey: ["accountInfo"] });
    queryClient.clear();
    navigate("/");
  }

  //Redirect if user not authenticated
  useEffect(() => {
    const userSession = storageInfo.get();
    if (!userSession.token || !userSession.tokenExp || !userSession.username) {
      navigate("/");
    } else if (Number(userSession.tokenExp) <= new Date().getTime()) {
      navigate("/");
    }
  }, []);

  //Current query states extracted from React-Query
  if (accountInfo.isLoading) {
    return (
      <div
        className="bg-white border-black rounded-md flex-col flex mx-auto border-2
        h-[40vh] shadow-bold-sm mt-[20vh] w-[25vw] gap-5 items-center justify-center"
      >
        <AiOutlineLoading fill="black" className="animate-spin" size="5rem" />
        <h1 className="font-montserrat font-bold text-4xl">loading...</h1>
      </div>
    );
  }

  if (accountInfo.isError) {
    return (
      <div
        className="bg-white border-black rounded-md flex-col flex mx-auto border-2
        h-[40vh] shadow-bold-sm mt-[20vh] w-[25vw] gap-5 items-center justify-center"
      >
        <BsExclamationCircleFill
          fill="black"
          className="animate-bounce"
          size="5rem"
        />
        <h1 className="font-montserrat font-semibold text-center text-3xl">
          Unable to connect to server
        </h1>
      </div>
    );
  }

  return (
    <div
      id="dashboard"
      className="md:(h-[100vh] grid w-[100vw] gap-0 grid-cols-2 grid-rows-[10vh 85vh 5vh] ) "
    >
      <div className="bg-black flex flex-row h-10vh col-span-2 items-center justify-between">
        <div className="flex my-auto ml-8 justify-center items-center">
          <RiCopperCoinFill className="mx-1" size={"1.8em"} fill="#ffffff" />
          <h1 className="font-bold font-montserrat mx-1 text-white text-3xl w-40">
            challeNGe
          </h1>
        </div>
        <button
          className="flex font-montserrat h-[1.5em] mr-8 text-white w-22 items-center justify-between"
          onClick={logOut}
        >
          <p>logout</p>
          <RiLogoutCircleRLine size={"1.5em"} />
        </button>
      </div>
      <div className="my-auto mx-auto h-70vh ml-[15vw] w-[60%] justify-center">
        <UserPanel
          username={`${userProfile.username}`}
          balance={accountInfo.data?.balance}
        />
      </div>
      <div className="flex flex-row my-auto ml-auto h-70vh mr-[15vw] w-[65%] gap-3 overflow-auto relative">
        <FilterPanel
          isCredit={isCredit}
          isDebit={isDebit}
          isOpen={isPanelOpen}
          isReverse={isReverse}
          setIsCredit={setIsCredit}
          setIsDebit={setIsDebit}
          setIsOpen={setIsPanelOpen}
          setIsReverse={setIsReverse}
        />
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className=" bg-white border-black rounded-md flex border-2 h-10 w-11 justify-center items-center"
        >
          <IoFilter size={"1.5rem"} />
        </button>
        <TransactionList
          transactions={filteredTransactions}
          isLoading={accountInfo.isLoading}
          isError={accountInfo.isError}
        />
      </div>
      <div
        className="bg-black flex font-montserrat h-5vh text-xs
      text-light-50 col-span-2 row-start-3 justify-center items-center self-end"
      >
        <p className="">
          Esse site é um projeto sem fins lucrativos desenvolvido para o
          processo seletivo da NG Cash
        </p>
      </div>
    </div>
  );
}
