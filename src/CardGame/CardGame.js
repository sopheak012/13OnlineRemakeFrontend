import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  playCard,
  endTurn,
  updateGameState,
} from "../features/cardGame/cardGame";
import { socket } from "../socket/initSocket";
import Card from "./Card";
import CardBack from "./CardBack";
import { FaCrown } from "react-icons/fa";
import { store } from "../app/store";

const CardGame = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.cardGame.players);
  const { lobbyName, username } = useParams();
  const fieldCard = useSelector((state) => state.cardGame.fieldCard);
  const turn = useSelector((state) => state.cardGame.turn);

  useEffect(() => {
    socket.emit("initial-cardGame", (update) => {
      dispatch(updateGameState(update));
    });
    socket.on("cardGame-update", (data) => {
      dispatch(updateGameState(data));
    });

    return () => {
      socket.off("cardGame-update");
    };
  }, []);

  const handleCardClick = (player, card) => {
    if (player.username === turn) {
      const lastCard = fieldCard && fieldCard[fieldCard.length - 1];
      if (lastCard && !card.includes(lastCard.split("_")[1])) {
        return;
      }
      dispatch(playCard({ username: player.username, card, lobbyName }));
      dispatch(endTurn());
      const cardGameState = store.getState().cardGame;
      socket.emit("cardGame-update", { lobbyName, cardGameState });
    }
  };

  const handlePass = () => {
    if (username === turn) {
      dispatch(endTurn());
      const cardGameState = store.getState().cardGame;
      socket.emit("cardGame-update", { lobbyName, cardGameState });
    }
  };

  return (
    <div className="app">
      <div className="players">
        {players.map((player) => (
          <div key={player.username}>
            <h2>
              {player.username}{" "}
              {player.username === turn && <FaCrown color="gold" />}
            </h2>
            <div>
              {player.username === username ? (
                player.hand.map((card, index) => {
                  return (
                    <Card
                      key={index}
                      card={card}
                      onClick={() => handleCardClick(player, card)}
                    />
                  );
                })
              ) : (
                <React.Fragment>
                  {[...Array(player.hand.length)].map((_, index) => (
                    <CardBack key={index} />
                  ))}
                </React.Fragment>
              )}
            </div>
          </div>
        ))}
        {turn === username && <button onClick={handlePass}>Pass</button>}
      </div>
      <div className="field">
        <h2>Field Cards</h2>
        <div className="field-cards">
          {fieldCard &&
            fieldCard.map((card, index) => (
              <Card key={index} card={card} onClick={() => {}} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardGame;
