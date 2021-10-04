import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDeck } from "../deck/deckSlice";
import { getBoard, updateBoard } from "../game/gameSlice";
import { randomCards } from "../../helper";

const Board = ({ socket }) => {
  const { board, street, pot, bet } = useSelector((state) => state.game.game);
  const gameID = useSelector((state) => state.game.game._id);
  const deck = useSelector((state) => state.deck.deck.deck);
  const deckID = useSelector((state) => state.deck.deck._id);

  const dispatch = useDispatch();

  function getFlop() {
    const flop = randomCards(deck, 3).map((card) => {
      return {
        ...card,
        isDealt: true,
      };
    });

    // Update deck
    const cardsToUpdate = flop.reduce((acc, curr) => {
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

    dispatch(updateBoard({ gameID, board: flop, street: "flop", pot }));
    dispatch(updateDeck({ deckID, updatedDeck }));
  }

  function getTurn() {
    const turn = randomCards(deck, 1).map((card) => {
      return {
        ...card,
        isDealt: true,
      };
    });

    // Update deck
    const cardsToUpdate = turn.reduce((acc, curr) => {
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

    dispatch(
      updateBoard({ gameID, board: [...board, turn[0]], street: "turn", pot })
    );
    dispatch(updateDeck({ deckID, updatedDeck }));
  }

  function getRiver() {
    const river = randomCards(deck, 1).map((card) => {
      return {
        ...card,
        isDealt: true,
      };
    });

    // Update deck
    const cardsToUpdate = river.reduce((acc, curr) => {
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

    dispatch(
      updateBoard({ gameID, board: [...board, river[0]], street: "river", pot })
    );
    dispatch(updateDeck({ deckID, updatedDeck }));
  }

  function handleNewStreet() {
    if (street === "" || street === "pre-flop") {
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

  useEffect(() => {
    socket.on("get-game", async (data) => {
      const parsed = await JSON.parse(data);
      dispatch(getBoard(parsed._id));
    });
  }, [socket, dispatch]);

  return (
    <>
      <h1>Board</h1>
      {board !== undefined && (
        <ul>
          {board.map((card) => (
            <li key={card.id}>
              {card.value} of {card.suit}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => handleNewStreet()}>New Street</button>
      <h3>Street: {street}</h3>
      <h3>Pot: {pot}</h3>
      <h3>Bet to call: {bet}</h3>
    </>
  );
};

export default Board;
