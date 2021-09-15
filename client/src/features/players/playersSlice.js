import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid, v4 } from "uuid";

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    player: {},
    players: [],
  },
  reducers: {
    addPlayer: (state, action) => {
      state.player = {
        id: v4(),
        name: action.payload,
        turn: false,
        hand: [],
        chips: 0,
        fold: false,
      };
      state.players = [...state.players, state.player];
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload.id
      );
    },
    dealHand: (state, action) => {
      state.players.forEach((player, idx) => {
        state.players[idx].hand = action.payload[player.id];
        if (player.id === state.player.id) {
          state.player.hand = action.payload[player.id];
        }
      });
    },
  },
});

export const { addPlayer, removePlayer, dealHand } = playersSlice.actions;
export default playersSlice.reducer;
