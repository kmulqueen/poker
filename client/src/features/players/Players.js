import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Players = ({ socket }) => {
  const players = useSelector((state) => state.players.players);
  const [lobby, setLobby] = useState([]);

  useEffect(() => {
    socket.on("get-players", (data) => {
      setLobby(JSON.parse(data));
    });
  }, [players]);

  return (
    <>
      <h1>Lobby</h1>
      <ul>
        {lobby.map((player, index) => (
          <li key={`${player.name}-${index}`}>{player.name}</li>
        ))}
      </ul>
      <h1>Players</h1>
      <ul>
        {players.map((player, index) => (
          <li key={`${player.name}-${index}`}>{player.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Players;
