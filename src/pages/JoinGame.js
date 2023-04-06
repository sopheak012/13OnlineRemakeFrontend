import React from "react";
import "../css/joinGame.css";

function JoinGame() {
  return (
    <div className="join-game-container">
      <h1>Join Game</h1>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
      <div className="game-list">
        <div className="game-list-header">
          <div>Game Name</div>
          <div>Current Players</div>
          <div>Public/Private</div>
        </div>
        <div className="game-list-body">
          {/* Game list goes here */}
          <div className="game-item">
            <div className="game-name">Game 1</div>
            <div className="game-players">2/4</div>
            <div className="game-type">Public</div>
          </div>
          <div className="game-item">
            <div className="game-name">Game 2</div>
            <div className="game-players">1/2</div>
            <div className="game-type">Private</div>
          </div>
        </div>
      </div>
      <button className="refresh-button">Refresh</button>
    </div>
  );
}

export default JoinGame;
