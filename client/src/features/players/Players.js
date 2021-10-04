import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllPlayers,
  removePlayer,
  updatePlayerTurns,
  playerFold,
  updatePlayerChips,
  updatePlayerBet,
} from "./playersSlice";
import { updatePot, updateBet } from "../game/gameSlice";
import { validPlayersIndexes } from "../../helper";

const Players = ({ socket }) => {
  const players = useSelector((state) => state.players.players);
  const player = useSelector((state) => state.players.player);
  const { _id: gameID, bet: gameBet } = useSelector((state) => state.game.game);

  const dispatch = useDispatch();

  const [betAmount, setBetAmount] = useState(100);

  const handleRemovePlayer = (id) => {
    dispatch(removePlayer(id));
  };

  const handleUpdatePlayerTurns = (action) => {
    let nextPlayer;
    // Get indexes of players who haven't folded.
    const validPlayers = validPlayersIndexes(players);

    // Get current player index from players state
    const currPlayerIdx = players.findIndex((elem) => elem._id === player._id);

    // Get current player index from the list of valid players
    const currValidPlayerIdx = validPlayers.indexOf(currPlayerIdx);

    // Assign next player to next valid index in players state
    if (validPlayers[currValidPlayerIdx + 1] !== undefined) {
      nextPlayer = players[validPlayers[currValidPlayerIdx + 1]];
    } else {
      nextPlayer = players[validPlayers[0]];
    }

    switch (action) {
      case "check":
        dispatch(updatePlayerTurns({ currPlayer: player, nextPlayer }));
        break;
      case "fold":
        dispatch(playerFold({ currPlayer: player, nextPlayer }));
        break;
      case "bet":
        dispatch(updatePot({ gameID, chips: betAmount }));
        dispatch(updatePlayerChips({ currPlayer: player, chips: betAmount }));
        dispatch(updatePlayerBet({ currPlayer: player, bet: betAmount }));
        if (betAmount > gameBet) {
          dispatch(updateBet({ gameID, bet: betAmount }));
        }
        dispatch(updatePlayerTurns({ currPlayer: player, nextPlayer }));
        break;
      //TODO - Make case for "call"
    }
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
            <h5>Folded: {person.fold ? "True" : "False"}</h5>
            <h5>Bet: {person.bet}</h5>
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
            <h5>Chips: {person.chips}</h5>
            {person.clientID === player.clientID ? (
              <>
                <button
                  onClick={() => handleUpdatePlayerTurns("fold")}
                  disabled={person.turn === false || person.fold === true}
                >
                  Fold
                </button>
                {person.bet === gameBet && (
                  <button
                    onClick={() => handleUpdatePlayerTurns("check")}
                    disabled={person.turn === false || person.fold === true}
                  >
                    Check
                  </button>
                )}
                {person.bet < gameBet && (
                  <button
                    onClick={() => handleUpdatePlayerTurns("check")} //TODO - Make case for "call"
                    disabled={person.turn === false || person.fold === true}
                  >
                    Call
                  </button>
                )}
                <button
                  onClick={() => handleUpdatePlayerTurns("bet")}
                  disabled={person.turn === false || person.fold === true}
                >
                  Bet
                </button>
                <label htmlFor="input-bet">Bet: {betAmount}</label>
                <input
                  name="input-bet"
                  type="range"
                  min={100}
                  max={person.chips}
                  step={25}
                  value={betAmount}
                  onChange={(e) => setBetAmount(parseInt(e.target.value))}
                />
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Players;
