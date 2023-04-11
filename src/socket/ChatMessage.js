import { useState } from "react";
import io from "socket.io-client";
import { socket } from "./initSocket";

function ChatMessage() {
  const [message, setMessage] = useState("");

  function sendMessage() {
    socket.emit("chat message", message);
    setMessage("");
  }

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatMessage;
