import React from "react";
import { useParams } from "react-router-dom";

function Game() {
  let { gameId } = useParams();
  return (
    <div className="Game">
      <h2>Game Area... Id: {gameId}</h2>
    </div>
  );
}

export default Game;
