import { socket } from "../socket/initSocket";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const { lobbyName } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    socket.emit("join-room", lobbyName);

    socket.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(messages);
    });

    return () => {
      socket.off("leave-room", lobbyName);
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      socket.emit("send-message", lobbyName, currentMessage);
      console.log("Message");
      setCurrentMessage("");
    }
  };

  return (
    <div>
      <h1>{lobbyName}</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatBox;
