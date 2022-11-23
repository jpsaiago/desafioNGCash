import { Route, Routes } from "react-router-dom";
import Login from "./components/Pages/Login/Login";
import AuthContainer from "./components/Pages/AuthContainer/AuthContainer";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import SignUp from "./components/Pages/Signup/Signup";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route element={<AuthContainer />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/*" element={<h1>There's no one here... Weird.</h1>} />
    </Routes>
  );
}
