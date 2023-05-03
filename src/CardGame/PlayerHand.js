import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const playerHand = () => {
  const { username } = useParams();
  const player = useSelector((state) =>
    state.cardGame.players.find((player) => player.username === username)
  );

  const renderCard = (card, index) => {
    const imageUrl = `../assets/${card}.png`;
    return <img key={index} src={imageUrl} alt={card} />;
  };
  return <div>{player.hand.map(renderCard)}</div>;
};

export default playerHand;
