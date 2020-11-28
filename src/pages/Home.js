import React, { useState } from "react";
import { db } from "../services/firebase";

const initialInputNumber = 19;

function Home() {
  const [gameKey, setGameKey] = useState(null);

  const createGame = async () => {
    let newGameObject = {
      startingNumber: initialInputNumber,
      currentNumber: initialInputNumber,
      currentPlayer: "playerA",
      createdBy: "playerA",
      winner: null,
      players: [{ name: "playerA", email: "a@a.com", type: "user" }],
      status: "waiting",
      log: [
        {
          player: "playerA",
          inputNumber: null,
          startingNumber: initialInputNumber,
          divisibleByThree: null,
          nextNumber: initialInputNumber
        }
      ]
    };
    let newGame = await db.push(newGameObject);
    console.log("New Game Key: ", newGame.key);
    setGameKey(newGame.key);
  };

  return (
    <div className="Home">
      <h2>Home page</h2>
      <div>
        <button onClick={createGame}>Create New Game</button>
      </div>
      <div>
        <h3>New Game Key: {gameKey}</h3>
      </div>
    </div>
  );
}

export default Home;
