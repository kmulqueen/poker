import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlayer } from "./playersSlice";

const CreatePlayerForm = ({ clientID, socket }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleCreatePlayer() {
    if (name === "") {
      return;
    }
    const payload = {
      name,
      clientID,
      socket,
    };
    dispatch(addPlayer(payload));
  }

  return (
    <>
      <h1>Add Player</h1>
      <label htmlFor="name">Enter name</label>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleCreatePlayer}>Create player</button>
    </>
  );
};

export default CreatePlayerForm;
