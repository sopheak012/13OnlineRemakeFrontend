// src/Card.js
import React from "react";
import "./Card.css";

const Card = ({ card, onClick }) => {
  const imageUrl = `${process.env.PUBLIC_URL}/assets/${card}.png`;

  return (
    <div className="card" onClick={onClick}>
      <img src={imageUrl} alt={`${card}`} />
    </div>
  );
};

export default Card;
