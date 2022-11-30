import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthRoot } from "./pages/AuthRoot/AuthRoot";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { SignUp } from "./pages/Signup/Signup";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <AuthRoot />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "/*",
    element: <h1>There's no one here...Weird.</h1>,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
