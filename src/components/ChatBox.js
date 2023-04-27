import { socket } from "../socket/initSocket";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/ChatBox.css";

const ChatBox = () => {
  const { username, lobbyName } = useParams();
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
      socket.emit("send-message", lobbyName, {
        username: username,
        message: currentMessage,
      });
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">{lobbyName}</h1>
      <div className="chat-messages">
        {messages.map(({ username, message }, index) => (
          <p className="chat-message" key={index}>
            <strong>{username}:</strong> {message}
          </p>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          className="chat-input"
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button className="chat-send-button" onClick={sendMessage}>
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
