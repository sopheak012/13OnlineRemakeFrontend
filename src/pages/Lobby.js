import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/lobby.css";
import {
  deleteGame,
  updateState,
  leaveGame,
} from "../features/gameList/gameList";
import { useParams } from "react-router-dom";
import { socket } from "../socket/initSocket";
import { useDispatch, useSelector } from "react-redux";
import cardGame, {
  shuffleDeck,
  addPlayer,
  dealCards,
  setInitialTurn,
} from "../features/cardGame/cardGame";

//import store
import { store } from "../app/store";

const Lobby = () => {
  const { lobbyName, username } = useParams();
  const [players, setPlayers] = useState([]);
  const [isHost, setIsHost] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //listen for start-game
    socket.on("start-game", () => {
      console.log('Client received "start-game" event');
      navigate(`/user/${username}/lobby/${lobbyName}/cardgame`);
    });

    //get initial update
    socket.emit("get-update", (update) => {
      dispatch(updateState(update));
      handleGetUpdate(update);
    });

    socket.on("update", (update) => {
      dispatch(updateState(update));
      handleGetUpdate(update);
    });

    return () => {
      socket.off("start-game");
      socket.off("update");
    };
  }, []);
  useEffect(() => {
    console.log(players);
  }, []);

  //get list of player in current lobby from state
  const handleGetUpdate = (update) => {
    const getLobby =
      update.find((game) => game.lobbyName === lobbyName)?.playerList || [];
    setIsHost(
      getLobby.some((player) => player.isHost && player.username === username)
    );
    const players = getLobby.map((player) => player.username);
    setPlayers(players);

    if (players.length === 0) {
      navigate(-1);
    }
  };

  const handleLeave = () => {
    if (!isHost) {
      dispatch(leaveGame({ lobbyName, username }));
    } else {
      dispatch(deleteGame(lobbyName));
    }
    navigate(-1);
  };

  const cardGameStart = () => {
    dispatch(shuffleDeck());
    players.forEach((player) => {
      dispatch(
        addPlayer({
          username: player,
        })
      );
    });
    dispatch(dealCards());
    if (isHost) {
      dispatch(setInitialTurn(username));
    }
    const cardGameState = store.getState().cardGame;
    socket.emit("cardGame-update", { lobbyName, cardGameState });
  };

  const handleStart = () => {
    socket.emit("start-game", lobbyName);
    navigate(`/user/${username}/lobby/${lobbyName}/cardgame`);
    cardGameStart();
  };

  return (
    <>
      {players.length > 0 && (
        <div className="lobby-container">
          <h1>{lobbyName}</h1>
          <div className="player-list">
            {players.map((player, index) => (
              <div key={index} className="player">
                {player}
              </div>
            ))}
          </div>
          <div className="btn-container">
            <button onClick={handleLeave}>Leave Lobby</button>
            {isHost && <button onClick={handleStart}>Start Game</button>}
          </div>
        </div>
      )}
      {players.length === 0 && (
        <div className="lobby-container">
          <p>Lobby has been deleted.</p>
        </div>
      )}
    </>
  );
};

export default Lobby;
