import { useSelector, useDispatch } from "react-redux";
import { dealHand } from "../players/playersSlice";
import { updateDeck } from "../deck/deckSlice";
import { randomCards } from "../../helper";

const Game = () => {
  const players = useSelector((state) => state.players.players);
  const deck = useSelector((state) => state.deck.deck);
  const dispatch = useDispatch();

  function dealHands() {
    // Get total number of cards to deal & mark them as dealt
    const cards = randomCards(deck, players.length * 2).map((card) => {
      return {
        ...card,
        isDealt: true,
      };
    });

    // Initialize payload as object where keys are player ids and value is array of 2 empty elements
    const playerHands = players.reduce((acc, item) => {
      acc[item.id] = Array(2);
      return acc;
    }, {});

    // Array of player ids
    const playerIDs = Object.keys(playerHands);

    // Simulate dealing 1 card per 1 player at a time
    const dealHalf = cards.length / 2;
    const firstHalf = cards.slice(0, dealHalf);
    const secondHalf = cards.slice(-dealHalf);

    firstHalf.forEach((card, i) => {
      playerHands[playerIDs[i]][0] = card;
    });
    secondHalf.forEach((card, i) => {
      playerHands[playerIDs[i]][1] = card;
    });

    dispatch(updateDeck(cards));
    dispatch(dealHand(playerHands));
  }

  return (
    <>
      <button onClick={dealHands}>Deal</button>
    </>
  );
};

export default Game;
