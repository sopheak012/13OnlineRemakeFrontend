import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/user";
import gameListReducer from "../features/gameList/gameList";
import formReducer from "../features/form/formSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameList: gameListReducer,
    form: formReducer,
  },
});

store.subscribe(() => {
  console.log(store.getState().user);
});

store.subscribe(() => {
  console.log(store.getState().gameList);
});
