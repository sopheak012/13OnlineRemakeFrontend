import io from "socket.io-client";

export const socket = io("https://one3backend.onrender.com");

export const initSocket = () => {
  socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
};
