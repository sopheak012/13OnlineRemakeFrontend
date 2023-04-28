import { socket } from "../socket/initSocket";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  leaveGame,
  deleteGame,
  updateState,
} from "../features/gameList/gameList";
import { useDispatch, useSelector } from "react-redux";
import "../css/ChatBox.css";

const ChatBox = () => {
  const { username, lobbyName } = useParams();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isHost, setIsHost] = useState(false);
  const gameList = useSelector((state) => state.gameList.gameList);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //get initial update
    socket.emit("get-update", (update) => {
      dispatch(updateState(update));
      handleGetUpdate(update);
    });

    socket.on("update", (update) => {
      dispatch(updateState(update));
      handleGetUpdate(update);
    });

    //check if host leve the lobby
    socket.on("delete-room", () => {
      socket.emit("leave-room", lobbyName);
      navigate(`/user/${username}`);
    });

    //join the room
    socket.emit("join-room", lobbyName);

    socket.on("receive-message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(messages);
    });

    return () => {
      socket.off("leave-room", lobbyName);
      socket.off("receive-message");
      socket.off("update");
    };
  }, []);

  const handleGetUpdate = (update) => {
    const getLobby =
      update.find((game) => game.lobbyName === lobbyName)?.playerList || [];
    setIsHost(
      getLobby.some((player) => player.isHost && player.username === username)
    );
  };

  const sendMessage = () => {
    console.log(isHost);
    if (currentMessage.trim() !== "") {
      socket.emit("send-message", lobbyName, {
        username: username,
        message: currentMessage,
      });
      setCurrentMessage("");
    }
  };

  const handleLeave = () => {
    if (!isHost) {
      dispatch(leaveGame({ lobbyName, username }));
      socket.emit("leave-room", lobbyName);
    } else {
      dispatch(deleteGame(lobbyName));
      socket.emit("delete-room", lobbyName);
    }
    navigate(`/user/${username}`);
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
        <button onClick={handleLeave}>Leave</button>
      </div>
    </div>
  );
};

export default ChatBox;
