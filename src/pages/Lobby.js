import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/lobby.css";

const Lobby = () => {
  // static data
  const lobbyName = "Waiting Room";
  const players = ["Player 1", "Player 2", "Player 3"];

  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate(-1);
  };

  return (
    <div className="lobby-container">
      <h1>{lobbyName}</h1>
      <button className="cancel-btn" onClick={() => navigate(-1)}>
        Cancel
      </button>
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
