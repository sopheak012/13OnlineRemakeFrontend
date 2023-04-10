import React, { createContext } from "react";
import io from "socket.io-client";

const SocketContext = createContext();

const initSocket = () => {
  console.log("TESTEST");
  const socket = io("http://localhost:4000");

  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  return socket;
};

const SocketProvider = ({ children }) => {
  const socket = initSocket();

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
