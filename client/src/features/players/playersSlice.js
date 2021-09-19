import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getAllPlayers = createAsyncThunk(
  "players/getAllPlayers",
  async () => {
    const res = await axios.get("/api/players", config);
    return await res.data;
  }
);

export const createPlayer = createAsyncThunk(
  "players/createPlayer",
  async (player) => {
    const { clientID, name, socket } = player;

    const payload = {
      name,
      clientID,
      turn: false,
      hand: [],
      chips: 0,
      fold: false,
      position: "",
    };

    const res = await axios.post("/api/players", payload, config);
    const newPlayer = await res.data;
    return { newPlayer, socket };
  }
);

export const removePlayer = createAsyncThunk(
  "players/removePlayer",
  async (id) => {
    const res = await axios.delete(`/api/players/${id}`, config);
    return res.data;
  }
);

export const playersSlice = createSlice({
  name: "players",
  initialState: {
    player: {},
    players: [],
    status: null,
  },
  reducers: {
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
  extraReducers: {
    [getAllPlayers.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAllPlayers.fulfilled]: (state, action) => {
      state.status = "success";
      state.players = action.payload;
    },
    [getAllPlayers.rejected]: (state, action) => {
      state.status = "failed";
    },
    [createPlayer.pending]: (state, action) => {
      state.status = "loading";
    },
    [createPlayer.fulfilled]: (state, action) => {
      state.status = "success";
      state.player = action.payload.newPlayer;
      state.players = [...state.players, action.payload.newPlayer];
    },
    [createPlayer.rejected]: (state, action) => {
      state.status = "failed";
    },
    [removePlayer.pending]: (state, action) => {
      state.status = "loading";
    },
    [removePlayer.fulfilled]: (state, action) => {
      state.status = "success";
    },
    [removePlayer.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { updatePlayers, dealHand, initializePositions, updatePosition } =
  playersSlice.actions;
export default playersSlice.reducer;
