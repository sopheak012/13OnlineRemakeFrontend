import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user";
import gameListReducer from "../features/gameList/gameList";
import cardGameReducer from "../features/cardGame/cardGame";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameList: gameListReducer,
    cardGame: cardGameReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState().user);
});

store.subscribe(() => {
  console.log(store.getState().gameList);
});
