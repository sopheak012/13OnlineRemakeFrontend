import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { SocketProvider } from "./socket/initSocket";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <SocketProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SocketProvider>
);
