import { createSlice } from "@reduxjs/toolkit";
import { socket } from "../../socket/initSocket";

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
      const { lobbyName, maxPlayers, lobby, playerList } = payload;

      const isLobbyNameUnique = state.gameList.every(
        (game) => game.lobbyName !== lobbyName
      );

      if (!isLobbyNameUnique) {
        throw new Error("The lobby name is already taken");
      }

      const newGame = {
        lobbyName,
        maxPlayers,
        lobby,
        playerList,
      };

      state.gameList.push(newGame);
      socket.emit("lobby-update", state.gameList);

      console.log(state.gameList);
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
    deleteGame: (state, action) => {
      const index = state.gameList.findIndex(
        (game) => game.lobbyName === action.payload
      );
      if (index !== -1) {
        state.gameList.splice(index, 1);
      }
      socket.emit("lobby-update", state.gameList);
    },
    updateState: (state, action) => {
      state.gameList = action.payload;
      socket.emit("lobby-update", state.gameList);
    },
  },
});

export const { createGame, joinGame, leaveGame, deleteGame, updateState } =
  gameListSlice.actions;

export default gameListSlice.reducer;
