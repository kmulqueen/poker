import { createSlice } from "@reduxjs/toolkit";
import originalDeck from "../../deck.json";
const deckCopy = JSON.parse(JSON.stringify(originalDeck));

export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deck: { ...deckCopy },
    availableCards: Object.keys(deckCopy).length,
  },
  reducers: {
    resetDeck: (state) => {
      state.deck = { ...deckCopy };
      state.availableCards = Object.keys(deckCopy).length;
    },
    updateDeck: (state, action) => {
      action.payload.forEach((card) => {
        state.deck[card.id] = card;
        state.availableCards--;
      });
    },
  },
});

export const { resetDeck, updateDeck } = deckSlice.actions;
export default deckSlice.reducer;
