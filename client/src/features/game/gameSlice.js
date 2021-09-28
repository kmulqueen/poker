import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const createGame = createAsyncThunk("game/createGame", async () => {
  const res = await axios.post("/api/game", config);
  return await res.data;
});

export const getBoard = createAsyncThunk("game/getBoard", async (gameID) => {
  const res = await axios.get(`/api/game/${gameID}`, config);
  return await res.data;
});

export const updateBoard = createAsyncThunk(
  "game/updateBoard",
  async ({ gameID, board, street, pot }) => {
    const res = await axios.post(
      `/api/game/${gameID}`,
      { board, street, pot },
      config
    );
    return await res.data;
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState: {
    game: {
      board: [],
      street: "",
      pot: 0,
    },
    status: null,
  },
  extraReducers: {
    [createGame.pending]: (state, action) => {
      state.status = "loading";
    },
    [createGame.fulfilled]: (state, action) => {
      state.game = action.payload;
      state.status = "success";
    },
    [createGame.rejected]: (state, action) => {
      state.status = "failed";
    },
    [updateBoard.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateBoard.fulfilled]: (state, action) => {
      state.game = action.payload;
      state.status = "success";
    },
    [updateBoard.rejected]: (state, action) => {
      state.status = "failed";
    },
    [getBoard.pending]: (state, action) => {
      state.status = "loading";
    },
    [getBoard.fulfilled]: (state, action) => {
      state.game = action.payload;
      state.status = "success";
    },
    [getBoard.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default gameSlice.reducer;
