import React from "react";
import { RouterProvider } from "react-router-dom";
import { useCheckToken } from "./hooks/useCheckToken";
import Router from "./components/Router";

function App() {
  useCheckToken();
  const router = Router();
  return <RouterProvider router={router} />;
}

export default App;
