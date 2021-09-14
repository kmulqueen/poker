import { configureStore } from "@reduxjs/toolkit";
import deckReducer from "./features/deck/deckSlice";
import boardReducer from "./features/board/boardSlice";
import playersReducer from "./features/players/playersSlice";

export default configureStore({
  reducer: {
    board: boardReducer,
    deck: deckReducer,
    players: playersReducer,
  },
});
