import { useSelector, useDispatch } from "react-redux";
import { updateBoard, updateStreet } from "./boardSlice";
import { updateDeck, resetDeck } from "../deck/deckSlice";
import { randomNumbers } from "../../helper";

const Board = () => {
  const board = useSelector((state) => state.board.board);
  const street = useSelector((state) => state.board.street);
  const deck = useSelector((state) => state.deck.deck);
  const dispatch = useDispatch();

  function getDeckSize() {
    // Initialize deck size
    let deckSize = Object.keys(deck).length;

    // Adjust deck size based on how many cards are marked as already dealt
    for (const property in deck) {
      if (deck[property].isDealt) {
        deckSize--;
      }
    }

    return deckSize;
  }

  //TODO - Refactor to not reuse code ========================
  function getFlop() {
    const deckSize = getDeckSize();

    const cardIDs = randomNumbers(deckSize, 3);

    const flop = cardIDs.map((id) => {
      return {
        ...deck[id],
        isDealt: true,
      };
    });

    dispatch(updateBoard(flop));
    dispatch(updateDeck(flop));
    dispatch(updateStreet("flop"));
  }

  function getTurn() {
    const deckSize = getDeckSize();

    const cardIDs = randomNumbers(deckSize, 1);

    const turn = cardIDs.map((id) => {
      return {
        ...deck[id],
        isDealt: true,
      };
    });

    dispatch(updateBoard([...board, turn[0]]));
    dispatch(updateDeck(turn));
    dispatch(updateStreet("turn"));
  }

  function getRiver() {
    const deckSize = getDeckSize();

    const cardIDs = randomNumbers(deckSize, 1);

    const river = cardIDs.map((id) => {
      return {
        ...deck[id],
        isDealt: true,
      };
    });

    dispatch(updateBoard([...board, river[0]]));
    dispatch(updateDeck(river));
    dispatch(updateStreet("river"));
  }
  //TODO - End Todo ===========================================

  function handleNewStreet() {
    if (street === "") {
      getFlop();
      return;
    } else if (street === "flop") {
      getTurn();
      return;
    } else if (street === "turn") {
      getRiver();
      return;
    } else {
      return;
    }
  }

  function handleNewGame() {
    dispatch(updateBoard([]));
    dispatch(resetDeck());
    dispatch(updateStreet(""));
  }

  return (
    <>
      <h1>Board</h1>
      <button onClick={handleNewStreet}>New Street</button>
      <button onClick={handleNewGame}>New Game</button>
      <h3>Street: {street}</h3>
    </>
  );
};

export default Board;
