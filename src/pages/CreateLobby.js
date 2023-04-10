import React, { useState } from "react";
import "../css/CreateGame.css";
import { useDispatch, useSelector } from "react-redux";
import { createGame } from "../features/gameList/gameList";
import { useNavigate } from "react-router-dom";

function CreateGame() {
  const [lobbyName, setlobbyName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [lobby, setLobby] = useState("public");
  const host = useSelector((state) => state.user.user.username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      createGame({
        lobbyName,
        maxPlayers,
        lobby,
        host,
      })
    );
    setlobbyName("");
    setMaxPlayers(1);
    setLobby("public");
    navigate(`/${host}/lobby/${lobbyName}`);
  };

  return (
    <div className="create-game">
      <h1>Create Game</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="game-name">Game Name:</label>
          <input
            type="text"
            id="game-name"
            name="game-name"
            value={lobbyName}
            onChange={(event) => setlobbyName(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="max-players">Max Players:</label>
          <input
            type="number"
            id="max-players"
            name="max-players"
            value={maxPlayers}
            onChange={(event) => setMaxPlayers(parseInt(event.target.value))}
            required
            min="1"
            max="4"
          />
        </div>
        <div className="form-control">
          <label htmlFor="lobby">Lobby:</label>
          <select
            id="lobby"
            name="lobby"
            value={lobby}
            onChange={(event) => setLobby(event.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button id="submit-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateGame;
