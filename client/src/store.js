import { configureStore } from "@reduxjs/toolkit";
import deckReducer from "./features/deck/deckSlice";
import gameReducer from "./features/game/gameSlice";
import playersReducer from "./features/players/playersSlice";

export default configureStore({
  reducer: {
    game: gameReducer,
    deck: deckReducer,
    players: playersReducer,
  },
});
