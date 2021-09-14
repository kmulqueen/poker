import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPlayer } from "./playersSlice";

const CreatePlayerForm = ({ clientID }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleCreatePlayer() {
    if (name === "") {
      return;
    }

    dispatch(addPlayer(name));
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
