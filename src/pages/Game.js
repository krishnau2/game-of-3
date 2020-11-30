import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";

import RegistrationForm from "../components/RegistrationForm";
import GameLog from "../components/GameLog";

function Game() {
  const [modalShow, showRegistrationForm] = useState(false);
  const [user, setUser] = useState({});
  const [currentGame, setCurrentGame] = useState(null);
  let { gameId } = useParams();
  let gameObj = db.child(gameId);

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const _isCurrentUserSessionIsValidPlayer = (playerList, currentUser) => {
    return playerList.find(player => player.email === currentUser.email);
  };

  const clearSession = () => {
    sessionStorage.removeItem("user");
  };

  const fetchCurrentGame = async () => {
    let currentUser = JSON.parse(sessionStorage.getItem("user"));

    let currentGameValue = null;
    await gameObj.on("value", snapShot => {
      // console.log("Current Game: ", snapShot.val());
      currentGameValue = snapShot.val();
      // console.log("CurrentGameValue: ", currentGameValue);

      if (currentUser) {
        if (
          _isCurrentUserSessionIsValidPlayer(
            currentGameValue.players,
            currentUser
          )
        ) {
          // A participant in current game
          setUser(currentUser);
        } else {
          // Not a participant in current game
          if (currentGameValue.players.length === 2) {
            // Already 2 participants
            clearSession();
          } else {
            // Single participant
            showRegistrationForm(true);
          }
        }
      } else {
        // No session details found
        if (currentGameValue.players.length < 2) {
          showRegistrationForm(true);
        }
      }

      setCurrentGame(currentGameValue);
    });
  };

  const _gameLogic = inputVal => {
    let currentNumber = parseInt(currentGame.currentNumber);
    let logObject = {
      player: user,
      inputNumber: inputVal,
      startingNumber: currentNumber
    };

    let nextNumber = currentNumber;
    let calculatedNumber = inputVal + currentNumber;

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
      nextUser = currentGame.players.find(
        player => player.email !== user.email
      );

      gameObj.update({
        currentPlayer: nextUser,
        currentNumber: newLogObject.nextNumber,
        log: log
      });
    }
  };

  const _handleUserRegistration = user => {
    console.log("Second User: ", user);

    let playerList = currentGame.players;
    playerList.push(user);
    gameObj.update({
      currentPlayer: user,
      players: playerList,
      status: "inprogress"
    });
    setUser(user);
    sessionStorage.setItem("user", JSON.stringify(user));
    showRegistrationForm(false);
  };

  const _renderUserControls = () => {
    let disabled = "disabled";
    if (
      currentGame &&
      currentGame.currentPlayer &&
      currentGame.currentPlayer.email === user.email
    ) {
      disabled = "";
    }

    return (
      <div className="user-control-wrap">
        <button
          className="user-control-btn"
          disabled={disabled}
          onClick={() => _handleUserInput(-1)}
        >
          -1
        </button>
        <button
          className="user-control-btn"
          disabled={disabled}
          onClick={() => _handleUserInput(0)}
        >
          0
        </button>
        <button
          className="user-control-btn"
          disabled={disabled}
          onClick={() => _handleUserInput(1)}
        >
          +1
        </button>
      </div>
    );
  };

  return (
    <div className="game-wrap">
      {/* <div>
        User:
        <input type="text" onChange={e => _handleUserName(e)} value={user} />
      </div> */}
      <h2>Game Id: {gameId}</h2>
      <div>
        <GameLog log={currentGame ? currentGame.log : []} />
      </div>
      {_renderUserControls()}
      <RegistrationForm
        show={modalShow}
        newGame={false}
        onHide={() => showRegistrationForm(false)}
        register={_handleUserRegistration}
      />
    </div>
  );
}

export default Game;
