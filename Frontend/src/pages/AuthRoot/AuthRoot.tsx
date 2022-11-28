import { Outlet } from "react-router-dom";
import "./background.css";

export function AuthRoot() {
  return (
    <div className="bg-white rounded-lg flex flex-col py-16 px-12 relative md:(h-[70vh] my-[15vh] mx-[35vw]) ">
      <Outlet />
    </div>
  );
}
