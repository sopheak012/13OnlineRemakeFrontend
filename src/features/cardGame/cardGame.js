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
      });
    },
    setInitialTurn: (state, action) => {
      state.turn = action.payload;
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
      const { lobbyName } = action.payload;
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
    endTurn: (state, action) => {
      const currentPlayerIndex = state.players.findIndex(
        (player) => player.username === state.turn
      );
      const nextPlayerIndex = (currentPlayerIndex + 1) % state.players.length;
      state.turn = state.players[nextPlayerIndex].username;
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
  showPlayer,
} = cardGameSlice.actions;

export default cardGameSlice.reducer;
