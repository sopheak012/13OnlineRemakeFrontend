import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gameList: [
    {
      lobbyName: null,
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
      const { lobbyName, maxPlayers, lobby, host } = payload;

      const islobbyNameUnique = state.gameList.every(
        (game) => game.lobbyName !== lobbyName
      );

      if (!islobbyNameUnique) {
        throw new Error("The lobby name already taken");
      }
      const newGame = {
        lobbyName,
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
      const { lobbyName, player } = payload;
      const gameIndex = state.gameList.findIndex(
        (game) => game.lobbyName === lobbyName
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
      const { lobbyName, playerName } = payload;
      const game = state.gameList.find((game) => game.lobbyName === lobbyName);
      if (!game) {
        throw new Error(`The game "${lobbyName}" does not exist`);
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
        (game) => game.lobbyName === payload.lobbyName
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
