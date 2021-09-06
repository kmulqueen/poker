import { createSlice } from "@reduxjs/toolkit";

export const boardSlice = createSlice({
  name: "board",
  initialState: {
    board: [],
    street: "",
  },
  reducers: {
    updateBoard: (state, action) => {
      state.board = action.payload;
    },
    updateStreet: (state, action) => {
      state.street = action.payload;
    },
  },
});

export const { updateBoard, updateStreet } = boardSlice.actions;
export default boardSlice.reducer;
