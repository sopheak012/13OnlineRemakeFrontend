import React, { useState } from "react";
import "../css/CreateGame.css";

function CreateGame() {
  const [gameName, setGameName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleGameNameChange = (event) => {
    setGameName(event.target.value);
  };

  const handleMaxPlayersChange = (event) => {
    setMaxPlayers(event.target.value);
  };

  const handleIsPrivateChange = (event) => {
    setIsPrivate(event.target.value === "private");
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
            value={gameName}
            onChange={handleGameNameChange}
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
            onChange={handleMaxPlayersChange}
            required
            min="1"
            max="4"
          />
        </div>
        <div className="form-control">
          <label htmlFor="is-private">Game Type:</label>
          <select
            id="is-private"
            name="is-private"
            value={isPrivate ? "private" : "public"}
            onChange={handleIsPrivateChange}
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
