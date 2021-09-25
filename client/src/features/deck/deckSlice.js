import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createDeck = createAsyncThunk("deck/createDeck", async (deck) => {
  const res = await axios.post("/api/deck", { deck: deck }, config);
  return await res.data;
});

export const getDeck = createAsyncThunk("deck/getDeck", async (deckID) => {
  const res = await axios.get(`/api/deck/${deckID}`, config);
  return await res.data;
});

export const updateDeck = createAsyncThunk(
  "deck/updateDeck",
  async ({ deckID, updatedDeck }) => {
    const res = await axios.post(`/api/deck/${deckID}`, updatedDeck, config);
    return await res.data;
  }
);

export const deckSlice = createSlice({
  name: "deck",
  initialState: {
    deck: {},
    status: null,
  },
  extraReducers: {
    [createDeck.pending]: (state, action) => {
      state.status = "loading";
    },
    [createDeck.fulfilled]: (state, action) => {
      state.status = "success";
      state.deck = action.payload;
    },
    [createDeck.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getDeck.pending]: (state, action) => {
      state.status = "loading";
    },
    [getDeck.fulfilled]: (state, action) => {
      state.status = "success";
      state.deck = action.payload;
    },
    [getDeck.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateDeck.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateDeck.fulfilled]: (state, action) => {
      state.status = "success";
      state.deck = action.payload;
    },
    [updateDeck.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default deckSlice.reducer;
