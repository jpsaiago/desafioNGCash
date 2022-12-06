import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { domAnimation, LazyMotion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom/client";
import "virtual:windi.css";
import { App, queryClient } from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LazyMotion features={domAnimation}>
        <App />
      </LazyMotion>
    </QueryClientProvider>
  </React.StrictMode>
);
