import { useSelector, useDispatch } from "react-redux";
import { dealHand } from "../players/playersSlice";
import { updateDeck } from "../deck/deckSlice";

const Game = () => {
  const players = useSelector((state) => state.players.players);
  const deck = useSelector((state) => state.deck.deck);
  const dispatch = useDispatch();

  function dealHands() {
    console.log(deck);
  }

  return (
    <>
      <button onClick={dealHands}>Deal</button>
    </>
  );
};

export default Game;
