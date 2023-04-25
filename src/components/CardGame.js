import React, { useRef, useEffect } from "react";
import Phaser from "phaser";

const CardGame = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 240,
      height: 342,
      backgroundColor: "#ffffff",
      parent: gameContainer.current,
      scene: {
        preload,
        create,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.spritesheet("cards", "frontend/src/phaser/assets/cards.png", {
        frameWidth: 80,
        frameHeight: 114,
      });
    }

    function create() {
      const cards = [];

      for (let i = 0; i < 3; i++) {
        const cardIndex = Math.floor(Math.random() * 52);
        const card = this.add.sprite(i * 80, 0, "cards", cardIndex);
        cards.push(card);
      }

      this.input.on("pointerdown", () => {
        for (let i = 0; i < 3; i++) {
          const cardIndex = Math.floor(Math.random() * 52);
          cards[i].setFrame(cardIndex);
        }
      });
    }

    return () => game.destroy();
  }, []);

  return <div ref={gameContainer}></div>;
};

export default CardGame;
