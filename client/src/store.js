import { configureStore } from "@reduxjs/toolkit";
import deckReducer from "./features/deck/deckSlice";
import boardReducer from "./features/board/boardSlice";
import playerReducer from "./features/players/playerSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
    deck: deckReducer,
    player: playerReducer,
  },
});
