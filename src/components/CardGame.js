import React, { useState } from "react";
import "../styles/ChatBox.css";

const ChatBox = ({ messages, onSend }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim() === "") return;
    onSend(inputValue);
    setInputValue("");
  };

  return (
    <div className="chat-box">
      <div className="chat-box__messages">
        {messages.map((msg, index) => (
          <div key={index} className="chat-box__message">
            <span className="chat-box__username">{msg.username}:</span>{" "}
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-box__input-container">
        <input
          type="text"
          className="chat-box__input"
          placeholder="Type a message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className="chat-box__send-button" onClick={handleSendClick}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
