import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    player: {},
    players: [],
  },
  reducers: {
    addPlayer: (state, action) => {
      const { clientID, name, socket } = action.payload;
      state.player = {
        id: uuid(),
        clientID: clientID,
        name: name,
        turn: false,
        hand: [],
        chips: 0,
        fold: false,
        position: "",
      };
      state.players = [...state.players, state.player];
      socket.emit("get-players", JSON.stringify(state.players));
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(
        (player) => player.id !== action.payload.id
      );
    },
    updatePlayers: (state, action) => {
      state.players = action.payload;
    },
    dealHand: (state, action) => {
      state.players.forEach((player, idx) => {
        state.players[idx].hand = action.payload[player.id];
        if (player.id === state.player.id) {
          state.player.hand = action.payload[player.id];
        }
      });
    },
    initializePositions: (state, action) => {
      // Check for heads up (only 2 players). Dealer is small blind.
      if (state.players.length === 2) {
        state.players.forEach((player, idx) => {
          if (idx === action.payload) {
            state.players[idx].position = "small blind";
            if (state.player.id === player.id) {
              state.player.position = "small blind";
            }
          } else {
            state.players[idx].position = "big blind";
            if (state.player.id === player.id) {
              state.player.position = "big blind";
            }
          }
        });
      }
    },
    updatePosition: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const {
  addPlayer,
  removePlayer,
  updatePlayers,
  dealHand,
  initializePositions,
  updatePosition,
} = playersSlice.actions;
export default playersSlice.reducer;
