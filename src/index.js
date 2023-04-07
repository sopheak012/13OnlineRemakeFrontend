import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:4000";

const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

ReactDOM.render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
  document.getElementById("root")
);
