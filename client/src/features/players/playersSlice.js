import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
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

export const dealHand = createAsyncThunk(
  "players/dealHand",
  async ({ players, hands, playerID }) => {
    let currPlayer;
    for (let i = 0; i < players.length; i++) {
      const res = await axios.post(
        `/api/players/${players[i]._id}/hand`,
        hands[players[i]._id],
        config
      );
      const p = await res.data.player;
      if (p._id === playerID) {
        currPlayer = p;
      }
    }
    return currPlayer;
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
    [dealHand.pending]: (state, action) => {
      state.status = "pending";
    },
    [dealHand.fulfilled]: (state, action) => {
      state.status = "success";
      state.player = action.payload;
    },
    [dealHand.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export const { initializePositions } = playersSlice.actions;
export default playersSlice.reducer;
