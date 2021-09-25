import { useSelector, useDispatch } from "react-redux";
import { dealHand, initializePositions } from "../players/playersSlice";
import { createDeck, getDeck, updateDeck } from "../deck/deckSlice";
import { updateBoard, updateStreet } from "../board/boardSlice";
import { randomCards, randomNumbers } from "../../helper";
import newDeck from "../../deck.json";

const Game = () => {
  const players = useSelector((state) => state.players.players);
  const currentPlayer = useSelector((state) => state.players.player);
  const deck = useSelector((state) => state.deck.deck.deck);
  const deckID = useSelector((state) => state.deck.deck._id);
  const test = useSelector((state) => state.deck);
  const dispatch = useDispatch();

  function handleNewGame() {
    // Initialize positions
    const dealerIndex = randomNumbers(players.length, 1)[0] - 1;

    dispatch(updateBoard([]));
    dispatch(createDeck({ deck: newDeck }));
    dispatch(updateStreet(""));
    dispatch(
      initializePositions({ players, playerID: currentPlayer._id, dealerIndex })
    );
  }

  function dealHands() {
    // Get total number of cards to deal & mark them as dealt
    const cards = randomCards(deck, players.length * 2).map((card) => {
      console.log("deck from deal", deck);
      return {
        ...card,
        isDealt: true,
      };
    });

    // Update deck
    const cardsToUpdate = cards.reduce((acc, curr) => {
      acc[curr.id] = { ...curr };
      return acc;
    }, {});
    let updatedDeck;
    if (deck.deck === undefined) {
      updatedDeck = {
        ...deck,
        ...cardsToUpdate,
      };
    } else {
      updatedDeck = {
        ...deck.deck,
        ...cardsToUpdate,
      };
    }

    // Initialize payload as object where keys are player ids and value is array of 2 empty elements
    const playerHands = players.reduce((acc, item) => {
      acc[item._id] = Array(2);
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

    dispatch(updateDeck({ deckID, updatedDeck }));
    dispatch(
      dealHand({ players, hands: playerHands, playerID: currentPlayer._id })
    );
  }

  return (
    <>
      <button onClick={handleNewGame}>New Game</button>
      <button onClick={dealHands}>Deal</button>
    </>
  );
};

export default Game;
