import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameList: [
    {
      gameName: null,
      maxPlayers: null,
      lobby: null,
      playerList: [],
    },
  ],
};

export const gameListSlice = createSlice({
  name: "gameList",
  initialState,
  reducers: {
    createGame: (state, { payload }) => {
      const { gameName, maxPlayers, lobby, host } = payload;

      const isGameNameUnique = state.gameList.every(
        (game) => game.gameName !== gameName
      );

      if (!isGameNameUnique) {
        throw new Error("The lobby name already taken");
      }
      const newGame = {
        gameName,
        maxPlayers,
        lobby,
        playerList: [
          {
            username: host,
            isHost: true,
          },
        ],
      };
      state.gameList.push(newGame);
    },
    joinGame: (state, { payload }) => {
      const { gameName, player } = payload;
      const gameIndex = state.gameList.findIndex(
        (game) => game.gameName === gameName
      );
      if (gameIndex !== -1) {
        const playerList = state.gameList[gameIndex].playerList;
        if (playerList.length < state.gameList[gameIndex].maxPlayers) {
          playerList.push({
            username: player.username,
            isHost: false,
          });
        } else {
          throw new Error("The game is already full");
        }
      } else {
        throw new Error("The game does not exist");
      }
    },

    leaveGame: (state, { payload }) => {
      const { gameName, playerName } = payload;
      const game = state.gameList.find((game) => game.gameName === gameName);
      if (!game) {
        throw new Error(`The game "${gameName}" does not exist`);
      }
      const index = game.playerList.findIndex(
        (player) => player.name === playerName
      );
      if (index !== -1) {
        game.playerList.splice(index, 1);
      }
    },
    deleteGame: (state, { payload }) => {
      const index = state.gameList.findIndex(
        (game) => game.gameName === payload.gameName
      );
      if (index !== -1) {
        state.gameList.splice(index, 1);
      }
    },
  },
});

export const { createGame, joinGame, leaveGame, deleteGame } =
  gameListSlice.actions;

export default gameListSlice.reducer;
