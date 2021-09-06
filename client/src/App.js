import io from "socket.io-client";
import Board from "./features/board/Board";

function App() {
  const socket = io("http://localhost:5000/");

  return (
    <>
      <Board />
    </>
  );
}

export default App;
