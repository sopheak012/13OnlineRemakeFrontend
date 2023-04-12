import { useState, useEffect } from "react";
import "../css/joinGame.css";
import { socket } from "../socket/initSocket";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { joinGame, updateState } from "../features/gameList/gameList";

const JoinGame = () => {
  const [gameList, setGameList] = useState([]);
  const { username } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("get-update", (update) => {
      setGameList(update);
      dispatch(updateState(update));
    });
  }, []);

  const handleJoin = (lobbyName) => {
    dispatch(joinGame({ lobbyName, username }));
    navigate(`/${username}/lobby/${lobbyName}`);
  };
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
          {gameList && gameList.length > 1 ? (
            gameList.slice(1).map((game, index) =>
              game.lobbyName ? (
                <div className="game-item" key={index}>
                  <div className="game-name">{game.lobbyName}</div>
                  <div className="game-players">{`${game.playerList.length}/${game.maxPlayers}`}</div>
                  <div className="game-type">{game.lobby}</div>
                  <button
                    className="join-button"
                    onClick={() => handleJoin(game.lobbyName)}
                  >
                    Join
                  </button>
                </div>
              ) : null
            )
          ) : (
            <div>No rooms available</div>
          )}
        </div>
      </div>
      <button className="refresh-button">Refresh</button>
    </div>
  );
};

export default JoinGame;
