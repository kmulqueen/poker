import io from "socket.io-client";
import Board from "./features/board/Board";
import CreatePlayerForm from "./features/players/CreatePlayerForm";
import Game from "./features/game/Game";

function App() {
  const socket = io("http://localhost:5000/");

  return (
    <>
      <CreatePlayerForm clientID={socket.id} />
      <Board />
      <Game />
    </>
  );
}

export default App;
