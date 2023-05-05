import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket/initSocket";

const values = [
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];

const suits = ["CLUBS", "SPADES", "HEARTS", "DIAMONDS"];

const deck = [];
for (let i = 0; i < values.length; i++) {
  for (let j = 0; j < suits.length; j++) {
    deck.push(`${suits[j]}_${values[i]}`);
  }
}

const initialState = {
  deck: deck,
  players: [],
  turn: null,
  winner: null,
  gameOver: false,
  fieldCard: null,
  extraTurn: false,
};

const cardGameSlice = createSlice({
  name: "cardGame",
  initialState,
  reducers: {
    shuffleDeck: (state) => {
      state.deck = state.deck.sort(() => Math.random() - 0.5);
    },
    addPlayer: (state, action) => {
      state.players.push({
        username: action.payload.username,
        hand: [],
      });
    },
    setInitialTurn: (state, action) => {
      state.turn = action.payload;

      // Find the player whose turn it is
      const player = state.players.find(
        (player) => player.username === action.payload
      );

      if (player) {
        // Get a card from the deck
        const card = state.deck.pop();

        // Add the card to the player's hand
        player.hand.push(card);
      }
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.username !== action.payload.username
      );
    },
    dealCards: (state) => {
      state.players.forEach((player) => {
        for (let i = 0; i < 1; i++) {
          player.hand.push(state.deck.pop());
        }
      });
    },
    playCard: (state, action) => {
      const player = state.players.find(
        (player) => player.username === action.payload.username
      );
      const cardIndex = player.hand.indexOf(action.payload.card);
      player.hand.splice(cardIndex, 1);
      if (state.fieldCard === null) {
        state.fieldCard = [action.payload.card];
      } else {
        state.fieldCard.unshift(action.payload.card);
      }

      // Check if player's hand is empty and declare them the winner if it is
      if (player.hand.length === 0) {
        state.winner = player.username;
        state.gameOver = true;
      }
    },

    endTurn: (state) => {
      const currentPlayerIndex = state.players.findIndex(
        (player) => player.username === state.turn
      );
      const nextPlayerIndex = (currentPlayerIndex + 1) % state.players.length;
      state.turn = state.players[nextPlayerIndex].username;
      state.extraTurn = false; // reset the extraTurn here
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
      state.gameOver = true;
    },

    drawCard: (state) => {
      const drawnCard = state.deck.pop();
      state.fieldCard.unshift(drawnCard);

      // End the current turn
      const currentPlayerIndex = state.players.findIndex(
        (player) => player.username === state.turn
      );
      const nextPlayerIndex = (currentPlayerIndex + 1) % state.players.length;
      state.turn = state.players[nextPlayerIndex].username;
      state.extraTurn = false; // reset the extraTurn here
    },

    setExtraTurn: (state) => {
      state.extraTurn = true;
    },
    updateGameState: (state, action) => {
      // Update the entire state with the new gameState
      return action.payload;
    },
    resetGame: (state) => {
      return initialState;

      // // Reset state to initial values
      // state.deck = [...initialState.deck];
      // state.players = initialState.players.map((player) => ({
      //   ...player,
      //   hand: [],
      // }));
      // state.winner = initialState.winner;
      // state.gameOver = initialState.gameOver;
      // state.fieldCard = initialState.fieldCard;
      // state.extraTurn = initialState.extraTurn;

      // // Set winner as the starting turn
      // state.turn = state.winner;

      // // Shuffle deck
      // state.deck = state.deck.sort(() => Math.random() - 0.5);

      // // Deal cards
      // state.players.forEach((player) => {
      //   for (let i = 0; i < 5; i++) {
      //     player.hand.push(state.deck.pop());
      //   }
      // });
    },
  },
});

export const {
  shuffleDeck,
  addPlayer,
  removePlayer,
  dealCards,
  playCard,
  endTurn,
  setWinner,
  setInitialTurn,
  updateGameState,
  showPlayer,
  drawCard,
  setExtraTurn,
  resetGame,
} = cardGameSlice.actions;

export default cardGameSlice.reducer;
