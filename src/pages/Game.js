import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";

import GameLog from "../components/GameLog";

const secondUser = { name: "playerB", email: "b@b.com", type: "user" };

function Game() {
  const [user, setUser] = useState("");
  const [currentGame, setCurrentGame] = useState(null);
  let { gameId } = useParams();
  let gameObj = db.child(gameId);

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const _handleUserName = e => {
    console.log(e.target.value);
    setUser(e.target.value);
  };

  const fetchCurrentGame = async () => {
    await gameObj.on("value", snapShot => {
      console.log("Current Game: ", snapShot.val());
      setCurrentGame(snapShot.val());
    });

    if (currentGame && currentGame.players.length < 2) {
      console.log("Creating second player");
      let playerList = currentGame.players;
      playerList.push(secondUser);
      gameObj.update({
        currentPlayer: "playerB",
        players: playerList,
        status: "inprogress"
      });
    }
  };

  const _gameLogic = inputVal => {
    let logObject = {
      player: user,
      inputNumber: inputVal,
      startingNumber: currentGame.currentNumber
    };

    let nextNumber = currentGame.currentNumber;
    let calculatedNumber = inputVal + currentGame.currentNumber;

    let divisibleBy3 = calculatedNumber % 3 === 0;
    if (divisibleBy3) {
      nextNumber = calculatedNumber / 3;
    }

    logObject.divisibleBy3 = divisibleBy3;
    logObject.nextNumber = nextNumber;

    return logObject;
  };

  const _handleUserInput = inputVal => {
    console.log("You pressed: ", inputVal);

    let newLogObject = _gameLogic(inputVal);

    let log = currentGame.log;
    log.push(newLogObject);

    let nextUser = null;
    if (currentGame) {
      nextUser = currentGame.players.find(player => player.name !== user);

      gameObj.update({
        currentPlayer: nextUser.name,
        currentNumber: newLogObject.nextNumber,
        log: log
      });
    }
  };

  const _renderUserControls = () => {
    let disabled = "disabled";
    if (currentGame && currentGame.currentPlayer === user) {
      disabled = "";
    }

    return (
      <div className="user-control-wrap">
        <button className="user-control-btn" disabled={disabled} onClick={() => _handleUserInput(-1)}>
          -1
        </button>
        <button className="user-control-btn" disabled={disabled} onClick={() => _handleUserInput(0)}>
          0
        </button>
        <button className="user-control-btn" disabled={disabled} onClick={() => _handleUserInput(1)}>
          +1
        </button>
      </div>
    );
  };

  return (
    <div className="game-wrap">
      <div>
        User:{" "}
        <input type="text" onChange={e => _handleUserName(e)} value={user} />
      </div>
      <h2>Game Area... Id: {gameId}</h2>
      <div>
        <GameLog log={currentGame ? currentGame.log : []} />
      </div>
      {_renderUserControls()}
    </div>
  );
}

export default Game;
