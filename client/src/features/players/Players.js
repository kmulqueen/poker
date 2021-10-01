import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlayers, removePlayer, updatePlayerTurns } from "./playersSlice";

const Players = ({ socket }) => {
  const players = useSelector((state) => state.players.players);
  const player = useSelector((state) => state.players.player);
  const dispatch = useDispatch();

  const handleRemovePlayer = (id) => {
    dispatch(removePlayer(id));
  };

  const handleUpdatePlayerTurns = (id) => {
    const currPlayerIdx = players.findIndex((element) => element._id === id);
    let nextPlayerID;
    if (currPlayerIdx !== players.length - 1) {
      nextPlayerID = players[currPlayerIdx + 1]._id;
    } else {
      nextPlayerID = players[0]._id;
    }
    dispatch(updatePlayerTurns({ players, currPlayerID: id, nextPlayerID }));
  };

  useEffect(() => {
    socket.on("get-players", (data) => {
      dispatch(getAllPlayers());
    });
  }, [socket, dispatch]);

  useEffect(() => {
    dispatch(getAllPlayers());
  }, [dispatch]);

  return (
    <>
      <h1>Players</h1>
      <ul>
        {players.map((person, index) => (
          <li key={`${person.name}-${index}`}>
            <h4>{person.name}</h4>
            <h5>Position: {person.position}</h5>
            <h5>Turn: {person.turn ? "True" : "False"}</h5>
            <h5>Hand:</h5>
            {person.clientID === player.clientID ? (
              <>
                <ul>
                  {person.hand.map((card) => (
                    <li key={card.id}>
                      {card.value} of {card.suit}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleRemovePlayer(player._id)}>
                  Leave
                </button>
              </>
            ) : (
              <ul>
                {person.hand.map((card, idx) => (
                  <li key={`${person.clientID}-${idx}`}>Card {idx + 1}</li>
                ))}
              </ul>
            )}
            {person.clientID === player.clientID ? (
              <>
                <button
                  onClick={() => handleUpdatePlayerTurns(player._id)}
                  disabled={person.turn === false}
                >
                  Fold
                </button>
                <button
                  onClick={() => handleUpdatePlayerTurns(player._id)}
                  disabled={person.turn === false}
                >
                  Check
                </button>
                <button
                  onClick={() => handleUpdatePlayerTurns(player._id)}
                  disabled={person.turn === false}
                >
                  Bet
                </button>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Players;
