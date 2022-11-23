import { PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";
import "./background.css";

export default function AuthContainer({ children }: PropsWithChildren) {
  return (
    <div id="credentials">
      <div className="bg-white rounded-lg flex absolute md:h-[70vh] md:my-[15vh] md:mx-[35vw] md:w-[30vw]">
        <Outlet />
      </div>
    </div>
  );
}
