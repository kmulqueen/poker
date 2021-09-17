import { useSelector, useDispatch } from "react-redux";
import { updateBoard, updateStreet } from "./boardSlice";
import { updateDeck } from "../deck/deckSlice";
import { randomCards } from "../../helper";

const Board = () => {
  const board = useSelector((state) => state.board.board);
  const street = useSelector((state) => state.board.street);
  const deck = useSelector((state) => state.deck.deck);
  const dispatch = useDispatch();

  function getFlop() {
    const flop = randomCards(deck, 3).map((card) => {
      return {
        ...card,
        isDealt: true,
      };
    });

    dispatch(updateBoard(flop));
    dispatch(updateDeck(flop));
    dispatch(updateStreet("flop"));
  }

  function getTurn() {
    const turn = randomCards(deck, 1).map((card) => {
      return {
        ...card,
        isDealt: true,
      };
    });

    dispatch(updateBoard([...board, turn[0]]));
    dispatch(updateDeck(turn));
    dispatch(updateStreet("turn"));
  }

  function getRiver() {
    const river = randomCards(deck, 1).map((card) => {
      return {
        ...card,
        isDealt: true,
      };
    });

    dispatch(updateBoard([...board, river[0]]));
    dispatch(updateDeck(river));
    dispatch(updateStreet("river"));
  }

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

  return (
    <>
      <h1>Board</h1>
      <button onClick={handleNewStreet}>New Street</button>
      <h3>Street: {street}</h3>
    </>
  );
};

export default Board;
