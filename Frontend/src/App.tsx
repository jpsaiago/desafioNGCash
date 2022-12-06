import { QueryClient } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { AnimatedRoutes } from "./AnimatedRoutes";

export const queryClient = new QueryClient();

export function App() {
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AnimatePresence>
  );
}
