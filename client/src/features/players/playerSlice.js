import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    name: "",
    turn: false,
    hand: [],
    chips: 0,
    fold: false,
  },
  reducers: {
    handleName: (state, action) => {
      state.name = action.payload;
    },
    handleTurn: (state) => {
      state.turn = !state.turn;
    },
    handleDeal: (state, action) => {
      state.hand = action.payload;
    },
    handleChips: (state, action) => {
      state.chips = action.payload;
    },
    handleFold: (state) => {
      state.fold = true;
    },
  },
});

export const { handleName, handleTurn, handleDeal, handleChips, handleFold } =
  playerSlice.actions;
export default playerSlice.reducer;
