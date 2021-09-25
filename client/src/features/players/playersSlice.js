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

export const initializePositions = createAsyncThunk(
  "players/initializePositions",
  async ({ players, playerID, dealerIndex }) => {
    let currPlayer = {};
    // Check for heads up (only 2 players)
    if (players.length === 2) {
      for (let i = 0; i < players.length; i++) {
        let position = { position: "" };
        if (i === dealerIndex) {
          position.position = "small blind";
        } else {
          position.position = "big blind";
        }
        const res = await axios.post(
          `/api/players/${players[i]._id}/position`,
          position,
          config
        );

        const p = await res.data.player;
        if (p._id === playerID) {
          currPlayer = p;
        }
      }
    } else {
      let smallBlindIndex, bigBlindIndex, res, p;

      // Check if last player in list is dealer button
      if (players[dealerIndex + 1] === undefined) {
        smallBlindIndex = 0;
        bigBlindIndex = 1;
      }
      // Check if second to last player in list is dealer button
      else if (dealerIndex === players.length - 2) {
        smallBlindIndex = players.length - 1;
        bigBlindIndex = 0;
      } else {
        smallBlindIndex = dealerIndex + 1;
        bigBlindIndex = dealerIndex + 2;
      }

      for (let i = 0; i < players.length; i++) {
        let position = { position: "" };

        if (i === dealerIndex) {
          position.position = "dealer";
        } else if (i === smallBlindIndex) {
          position.position = "small blind";
        } else if (i === bigBlindIndex) {
          position.position = "big blind";
        }

        res = await axios.post(
          `/api/players/${players[i]._id}/position`,
          position,
          config
        );

        p = await res.data.player;
        if (p._id === playerID) {
          currPlayer = p;
        }
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
    [initializePositions.pending]: (state, action) => {
      state.status = "pending";
    },
    [initializePositions.fulfilled]: (state, action) => {
      state.status = "success";
      state.player = action.payload;
    },
    [initializePositions.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default playersSlice.reducer;
