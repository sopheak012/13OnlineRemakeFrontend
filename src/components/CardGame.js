import React, { useRef, useEffect } from "react";
import Phaser from "phaser";
import cardsPath from "../phaser/assets/cards.png";

const CardGame = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
      parent: gameContainer.current,
      scene: {
        preload,
        create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.spritesheet("cards", cardsPath, {
        frameWidth: 80,
        frameHeight: 114,
        frameSpacing: 2, // Adjust the frame spacing based on the gap between the cards
      });
    }

    function create() {
      const card = this.add.sprite(
        game.config.width / 2,
        game.config.height / 2,
        "cards",
        12
      ); // Display the Ace of Spades, which has an index of 12
      card.setOrigin(0.5, 0.5);
      card.setData("backgroundColor", "red"); // Set the background color to red

      this.input.on("pointerdown", () => {
        card.setTint(Math.random() * 0xffffff); // Set a random tint for the card
      });
    }

    return () => game.destroy();
  }, []);

  return (
    <div
      ref={gameContainer}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></div>
  );
};

export default CardGame;
