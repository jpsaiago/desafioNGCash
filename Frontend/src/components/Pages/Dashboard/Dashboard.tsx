import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { CoinLogo } from "../../Helper/CoinLogo";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    // if (
    //   !s("token") ||
    //   new Date().getTime() > Number(window.sessionStorage.getItem("tokenExp"))
    // ) {
    //   return navigate("/login");
    // }
    // setUser(`${window.sessionStorage.getItem("username")}`);
  }, []);

  return (
    <div
      id="dashboard"
      className="md:(h-100vh grid w-100vw gap-0 grid-cols-2 grid-rows-[10vh 85vh 5vh]) "
    >
      <div className="bg-black flex flex-row h-10vh w-full col-span-2 align-center">
        <div className="flex flex-row my-auto w-72 justify-center">
          <CoinLogo className="mx-1 w-10" fill="#ffffff" />
          <h1 className="font-bold font-montserrat mx-1 text-white text-3xl w-40">
            challeNGe
          </h1>
        </div>
        <button
          className="font-montserrat text-white"
          onClick={() => {
            window.localStorage.clear();
            navigate("/login");
          }}
        >
          sair
        </button>
      </div>
      <div className="flex bg-blue-300 h-85vh">
        <div className="bg-white border-black rounded-md border-2 h-1/3 shadow-bold-sm w-1/2">
          a
        </div>
      </div>
      <div></div>
      <div className="bg-black flex font-montserrat h-5vh text-xs text-light-50 col-span-2 row-start-3 justify-center items-center self-end">
        <p className="">
          Esse site é um projeto sem fins lucrativos desenvolvido para o
          processo seletivo da NG Cash
        </p>
      </div>
    </div>
  );
}
