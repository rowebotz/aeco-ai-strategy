import { enableMapSet } from "immer";
enableMapSet();

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import "@/index.css";

import { HomePage } from "@/pages/HomePage";
import { MethodologyPage } from "@/pages/MethodologyPage"; // make sure this exists

const queryClient = new QueryClient();

const router = createHashRouter([
  { path: "/", element: <HomePage /> },
  { path: "/methodology", element: <MethodologyPage /> },
  // add your other routes here
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
