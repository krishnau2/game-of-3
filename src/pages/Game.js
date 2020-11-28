import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";

const secondUser = { name: "playerB", email: "b@b.com", type: "user" };

function Game() {
  const [currentGame, setCurrentGame] = useState(null);
  let { gameId } = useParams();

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const fetchCurrentGame = async () => {
    let gameObj = db.child(gameId);

    await gameObj.on("value", snapShot => {
      console.log("Current Game: ", snapShot.val());
      setCurrentGame(snapShot.val());
    });

    if (currentGame && currentGame.players.length < 2) {
      let playerList = currentGame.players;
      playerList.push(secondUser);
      gameObj.update({
        currentPlayer: "playerB",
        players: playerList,
        status: "inprogress"
      });
    }
  };

  const renderLogItems = () => {
    if (currentGame && currentGame.log) {
      console.log("Log: ", currentGame.log);
      return currentGame.log.map(item => {
        return <li>{item.startingNumber}</li>;
      });
    }
  };

  const renderLog = () => {
    return <ul>{renderLogItems()}</ul>;
  };

  const _handleUserInput = input => {
    console.log("You pressed: ", input);
  };

  return (
    <div className="Game">
      <h2>Game Area... Id: {gameId}</h2>
      <div>{renderLog()}</div>
      <div>
        <button disabled="" onClick={() => _handleUserInput(-1)}>
          -1
        </button>
        <button onClick={() => _handleUserInput(0)}>0</button>
        <button onClick={() => _handleUserInput(1)}>+1</button>
      </div>
    </div>
  );
}

export default Game;
