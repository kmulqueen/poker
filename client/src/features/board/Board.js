import { useSelector, useDispatch } from "react-redux";
import { updateBoard, updateStreet } from "./boardSlice";
import { updateDeck, resetDeck } from "../deck/deckSlice";

const Board = () => {
  const board = useSelector((state) => state.board.board);
  const street = useSelector((state) => state.board.street);
  const deck = useSelector((state) => state.deck.deck);
  const dispatch = useDispatch();

  function getFlop() {
    let updatedDeck = [...deck];
    let rand1 = Math.floor(Math.random() * updatedDeck.length);
    rand1 = updatedDeck.splice(rand1, 1)[0];
    let rand2 = Math.floor(Math.random() * updatedDeck.length);
    rand2 = updatedDeck.splice(rand2, 1)[0];
    let rand3 = Math.floor(Math.random() * updatedDeck.length);
    rand3 = updatedDeck.splice(rand3, 1)[0];

    const flop = [rand1, rand2, rand3];

    dispatch(updateBoard(flop));
    dispatch(updateDeck(updatedDeck));
    dispatch(updateStreet("flop"));
  }

  function getTurn() {
    let updatedDeck = [...deck];
    let rand = Math.floor(Math.random() * updatedDeck.length);
    rand = updatedDeck.splice(rand, 1)[0];

    dispatch(updateBoard([...board, rand]));
    dispatch(updateDeck(updatedDeck));
    dispatch(updateStreet("turn"));
  }

  function getRiver() {
    let updatedDeck = [...deck];
    let rand = Math.floor(Math.random() * updatedDeck.length);
    rand = updatedDeck.splice(rand, 1)[0];

    dispatch(updateBoard([...board, rand]));
    dispatch(updateDeck(updatedDeck));
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
