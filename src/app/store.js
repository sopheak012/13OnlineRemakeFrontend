import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "../features/isLogin/isLoginSlice";

export const store = configureStore({
  reducer: {
    isLogin: isLoginReducer,
  },
});
