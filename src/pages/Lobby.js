import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/lobby.css";
import { deleteGame } from "../features/gameList/gameList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Lobby = () => {
  // static data
  //const lobbyName = "Waiting Room";
  const players = ["Player 1", "Player 2", "Player 3"];

  const { username, lobbyName } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancelClick = () => {
    dispatch.deleteGame({ lobbyName });
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
