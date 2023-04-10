import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createLobbyForm: null,
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    createLobbyStatus: (state, action) => {
      state.createLobbyForm = action.payload;
    },
  },
});

export const { createLobbyStatus } = formSlice.actions;

export default formSlice.reducer;
