import { useEffect, useState } from "react";
import io from "socket.io-client";
import Board from "./features/board/Board";
import CreatePlayerForm from "./features/players/CreatePlayerForm";
import Players from "./features/players/Players";
import Game from "./features/game/Game";

function App() {
  const [clientID, setClientID] = useState("");
  const socket = io("http://localhost:5000/");

  useEffect(() => {
    socket.on("connect", () => {
      setClientID(socket.id);
    });
  }, []);

  return (
    <>
      <CreatePlayerForm clientID={clientID} socket={socket} />
      <Players socket={socket} />
      <Board socket={socket} />
      <Game socket={socket} />
    </>
  );
}

export default App;
