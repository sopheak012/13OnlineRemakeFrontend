import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cardGame, {
  playCard,
  endTurn,
  updateGameState,
} from "../features/cardGame/cardGame";
import { socket } from "../socket/initSocket";
import Card from "./Card";
import CardBack from "./CardBack";

const CardGame = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.cardGame.players);
  const { lobbyName, username } = useParams();
  const fieldCard = useSelector((state) => state.cardGame.fieldCard);
  const cardGameState = useSelector((state) => state.cardGame);

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
    dispatch(playCard({ username: player.username, card }));
    dispatch(endTurn());
    console.log(cardGameState);
  };

  return (
    <div className="app">
      <div className="players">
        {players.map((player) => (
          <div key={player.username}>
            <h2>{player.username}</h2>
            <div>
              {player.showHand ? (
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
