import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/lobby.css";
import { deleteGame } from "../features/gameList/gameList";
import { useParams } from "react-router-dom";
import { socket } from "../socket/initSocket";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Lobby = () => {
  const { lobbyName, username } = useParams();
  const [playerList, setPlayerlist] = useState([]);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    socket.emit("get-update", (update) => {
      const getGameList =
        update.find((game) => game.lobbyName === lobbyName)?.playerList || [];
      setPlayerlist(getGameList);
      setIsHost(
        getGameList.some(
          (player) => player.isHost && player.username === username
        )
      );
    });
  }, []);

  const players = playerList.map((player) => player.username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    dispatch(deleteGame(lobbyName));
    navigate(-1);
  };

  return (
    <div className="lobby-container">
      <h1>{lobbyName}</h1>
      {isHost && (
        <button className="cancel-btn" onClick={handleCancelClick}>
          Cancel
        </button>
      )}
      <div className="player-list">
        {players.map((player, index) => (
          <div key={index} className="player">
            {player}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lobby;
