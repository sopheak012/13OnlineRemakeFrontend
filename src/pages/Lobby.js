import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/lobby.css";
import { deleteGame } from "../features/gameList/gameList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Lobby = () => {
  const { lobbyName } = useParams();

  //get playerList from redux
  const playerList = useSelector(
    (state) =>
      state.gameList.gameList.find((game) => game.lobbyName === lobbyName)
        ?.playerList || []
  );

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
      <button className="cancel-btn" onClick={handleCancelClick}>
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
