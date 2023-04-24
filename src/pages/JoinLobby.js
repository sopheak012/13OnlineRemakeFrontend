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

  const [error, setError] = useState(null);

  useEffect(() => {
    //get initial update
    socket.emit("get-update", (update) => {
      setGameList(update);
      dispatch(updateState(update));
    });
    //update the page with any new change from server
    socket.on("update", (update) => {
      setGameList(update);
      dispatch(updateState(update));
    });
    // cleanup function to turn off the socket
    return () => {
      socket.off("update");
    };
  }, []);

  const handleJoin = (lobbyName) => {
    try {
      setError(null);
      dispatch(joinGame({ lobbyName, username }));
      navigate(`/${username}/lobby/${lobbyName}`);
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 500);
    }
  };
  return (
    <div className="join-game-container">
      {error && <div className="error-message">{error}</div>}
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
