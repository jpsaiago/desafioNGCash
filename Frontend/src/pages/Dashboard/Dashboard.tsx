import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, AnimationProps, m } from "framer-motion";
import { useEffect, useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";
import { IoFilter } from "react-icons/io5";
import { RiCopperCoinFill, RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { FilterPanel } from "../../components/FilterPanel/FilterPanel";
import { TransactionList } from "../../components/TransactionList/TransactionList";
import { UserPanel } from "../../components/UserPanel/UserPanel";
import { userAPI } from "../../services/userAPI";
import "../../style/dashBackground.css";
import { storageInfo } from "../../utils/storageInfo";

export function Dashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userSession = storageInfo.get();

  //Get user account info from server
  const accountInfo = useQuery({
    queryKey: ["accountInfo"],
    queryFn: async () => await userAPI.getInfo(`${storageInfo.get().token}`),
    staleTime: 1000 * 60 * 3, //3 minutes of staleTime between fetches
    retry: false,
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

  //Clear login data
  function logOut() {
    window.localStorage.clear();
    navigate("/");
  }

  //Redirect if user not authenticated
  useEffect(() => {
    if (!userSession.token || !userSession.tokenExp || !userSession.username) {
      console.log("tô aqui");
      navigate("/");
    } else if (Number(userSession.tokenExp) <= new Date().getTime()) {
      navigate("/");
    }
    return () => {
      queryClient.clear();
      queryClient.cancelQueries({ queryKey: ["accountInfo"] });
    };
  }, []);

  if (accountInfo.isLoading) {
    const loadingAnim: AnimationProps = {
      initial: {
        opacity: 0.2,
      },
      animate: {
        opacity: 1,
      },
      transition: {
        repeatType: "reverse",
        repeat: Infinity,
        duration: 0.7,
      },
      exit: {
        opacity: 0,
      },
    };
    //Current query states extracted from React-Query
    return (
      <div className="bg-black h-[100vh] grid w-[100vw] justify-center align-middle">
        <m.div
          {...loadingAnim}
          className="flex flex-row gap-2 justify-center items-center"
        >
          <RiCopperCoinFill className="h-[7vh] max-h-24 w-[7vh]" fill="white" />
          <h1 className="font-bold font-montserrat my-auto text-white text-[5vh]">
            challeNGe
          </h1>
        </m.div>
      </div>
    );
  }

  if (accountInfo.isError) {
    return (
      <div
        className="bg-black flex-col flex mx-auto top-0 right-0 bottom-0 left-0
        gap-5 fixed items-center justify-center"
      >
        <BsExclamationCircleFill
          fill="white"
          className="animate-bounce"
          size="5rem"
        />
        <h1 className="font-montserrat font-semibold text-center text-white text-3xl">
          Unable to connect to server
        </h1>
        <Button
          bgColor="bg-orange-400"
          className="h-10 w-22"
          value="logout"
          onClick={() => logOut()}
        />
      </div>
    );
  }

  const dashboardAnim: AnimationProps = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-100%",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <>
      <m.div
        {...dashboardAnim}
        className="bg-black top-0 right-0 bottom-0 left-0 z-10 fixed"
      />
      <div
        id="dashboard"
        className="flex flex-col
        md:(h-[100vh] grid w-[100vw] gap-0 grid-cols-2 grid-rows-[10vh 85vh 5vh] ) "
      >
        <div className="bg-black flex flex-row h-[5vh] justify-between items-center md:(h-10vh col-span-2  ) ">
          <div className="flex my-auto ml-4 justify-center items-center">
            <RiCopperCoinFill
              className="h-4 mx-1 w-4"
              size={"100%"}
              fill="#ffffff"
            />
            <h1 className="font-bold font-montserrat text-sm text-white md:( text-3xl w-40 mx-1) ">
              challeNGe
            </h1>
          </div>
          <button
            className="flex font-montserrat font-medium h-[1.5em] mr-8 text-white w-22 items-center justify-between"
            onClick={() => logOut()}
          >
            <p>logout</p>
            <RiLogoutCircleRLine size={"100%"} className="h-5 w-5" />
          </button>
        </div>
        <div className="flex flex-col mx-auto h-[35vh] w-[92%] items-center justify-center md:(justify-start my-auto mx-auto h-70vh ml-[15vw] w-[60%]) ">
          <UserPanel
            userToken={`${userSession.token}`}
            username={`${userSession.username}`}
            balance={accountInfo.data?.balance}
          />
        </div>
        <div
          className="bg-black flex flex-col h-[60vh] px-4 gap-3 overflow-scroll relative
        md:(bg-transparent my-auto ml-auto h-[70vh] mr-[15vw] w-[65%] flex-row overflow-hidden ) "
        >
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className=" bg-white rounded-md flex h-[6%] mt-2 gap-1 justify-center items-center
            md:(border-black rounded-md border-2 h-10 w-11) "
          >
            <IoFilter size="1.5rem" />
            <p className="font-montserrat font-semibold md:(hidden)">filter</p>
          </button>
          <TransactionList transactions={filteredTransactions}>
            <AnimatePresence>
              {isPanelOpen ? (
                <FilterPanel
                  key={"teste"}
                  isCredit={isCredit}
                  isDebit={isDebit}
                  isReverse={isReverse}
                  setIsCredit={setIsCredit}
                  setIsDebit={setIsDebit}
                  setIsOpen={setIsPanelOpen}
                  setIsReverse={setIsReverse}
                />
              ) : null}
            </AnimatePresence>
          </TransactionList>
        </div>
        <div
          className=" hidden md:(bg-black block flex font-montserrat h-5vh text-xs
      text-light-50 col-span-2 row-start-3 justify-center items-center self-end) "
        >
          <p>
            Esse site é um projeto sem fins lucrativos desenvolvido para o
            processo seletivo da NG Cash
          </p>
        </div>
      </div>
    </>
  );
}
