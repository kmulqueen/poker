import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPlayers } from "./playersSlice";

const Players = ({ socket }) => {
  const players = useSelector((state) => state.players.players);
  const dispatch = useDispatch();

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
        {players.map((player, index) => (
          <li key={`${player.name}-${index}`}>
            <h4>
              {player.name} - {player.clientID}
            </h4>
            <h5>Hand:</h5>
            <ul>
              {player.hand.map((card) => (
                <li key={card.id}>
                  {card.value} of {card.suit}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Players;
