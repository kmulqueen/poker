import { createSlice } from "@reduxjs/toolkit";
import originalDeck from "../../deck.json";
const deckCopy = JSON.parse(JSON.stringify(originalDeck));

export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deck: [...deckCopy],
  },
  reducers: {
    resetDeck: (state) => {
      state.deck = deckCopy;
    },
    updateDeck: (state, action) => {
      state.deck = action.payload;
    },
  },
});

export const { resetDeck, updateDeck } = deckSlice.actions;
export default deckSlice.reducer;
