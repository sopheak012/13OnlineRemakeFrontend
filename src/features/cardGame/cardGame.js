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
        showHand: action.payload.showHand,
      });
    },

    setInitialTurn: (state, action) => {
      state.turn = action.payload;
      socket.emit("cardGame-update", (action.payload.lobbyName, state));
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.username !== action.payload.username
      );
    },
    dealCards: (state) => {
      state.players.forEach((player) => {
        for (let i = 0; i < 5; i++) {
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
        state.fieldCard.push(action.payload.card);
      }
    },

    endTurn: (state) => {
      const currentPlayerIndex = state.players.findIndex(
        (player) => player.username === state.turn
      );
      const nextPlayerIndex = (currentPlayerIndex + 1) % state.players.length;
      state.players[currentPlayerIndex].showHand = false;
      state.turn = state.players[nextPlayerIndex].username;
      state.players[nextPlayerIndex].showHand = true;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
      state.gameOver = true;
    },
    updateGameState: (state, action) => {
      // Update the entire state with the new gameState
      return action.payload;
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
} = cardGameSlice.actions;

export default cardGameSlice.reducer;
