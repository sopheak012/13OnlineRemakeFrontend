import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  shuffleDeck,
  addPlayer,
  dealCards,
  playCard,
  endTurn,
  setInitialTurn,
} from "../features/cardGame/cardGame";
import Card from "./Card";

const CardGame = () => {
  const dispatch = useDispatch();
  const players = useSelector((state) => state.cardGame.players);
  const { username } = useParams();
  const fieldCard = useSelector((state) => state.cardGame.fieldCard);

  useEffect(() => {
    dispatch(shuffleDeck());
    dispatch(addPlayer({ username: "Player 1", showHand: true }));
    dispatch(addPlayer({ username: "Player 2", showHand: false }));
    dispatch(addPlayer({ username: "Player 3", showHand: false }));
    dispatch(addPlayer({ username: "Player 4", showHand: false }));
    dispatch(dealCards());
    dispatch(setInitialTurn("Player 1"));
  }, [dispatch, username]);

  const handleCardClick = (player, card) => {
    dispatch(playCard({ username: player.username, card }));
    dispatch(endTurn());
  };

  return (
    <div className="app">
      <div className="players">
        {players.map((player) => (
          <div key={player.username}>
            <h2>{player.username}</h2>
            <div>
              {player.showHand
                ? player.hand.map((card, index) => {
                    return (
                      <Card
                        key={index}
                        card={card}
                        onClick={() => handleCardClick(player, card)}
                      />
                    );
                  })
                : "Cards hidden"}
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
