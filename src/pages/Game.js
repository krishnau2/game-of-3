import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";

import GameHeader from "../components/GameHeader";
import GameShareLink from "../components/GameShareLink";
import RegistrationForm from "../components/RegistrationForm";
import GameMoves from "../components/GameMoves";

import { getCurrentUserSession, clearSession } from "../services/util";

function Game() {
  const [showForm, showRegistrationForm] = useState(false);
  const [user, setUser] = useState({});
  const [currentGame, setCurrentGame] = useState(null);
  let { gameId } = useParams();
  let gameObj = db.child(gameId);

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const _isCurrentUserIsValidPlayer = (playerList, currentUser) => {
    return playerList.find(player => player.email === currentUser.email);
  };

  const fetchCurrentGame = async () => {
    let currentUser = getCurrentUserSession();
    let currentGameValue = null;

    await gameObj.on("value", snapShot => {
      currentGameValue = snapShot.val();

      if (currentUser) {
        if (
          _isCurrentUserIsValidPlayer(currentGameValue.players, currentUser)
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

  const _calculateNumberForNextMove = inputVal => {
    let currentNumber = parseInt(currentGame.currentNumber);
    let moveObject = {
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

    moveObject.divisibleBy3 = divisibleBy3;
    moveObject.nextNumber = nextNumber;

    return moveObject;
  };

  const findNextPlayer = () => {
    return currentGame.players.find(player => player.email !== user.email);
  };

  const isNextMovePossible = currentMove => {
    return currentMove.nextNumber !== 1;
  };

  const _handleGameMoves = inputVal => {
    let newMoveObject = _calculateNumberForNextMove(inputVal);

    let log = currentGame.log;
    log.push(newMoveObject);

    if (isNextMovePossible(newMoveObject)) {
      gameObj.update({
        currentPlayer: findNextPlayer(),
        currentNumber: newMoveObject.nextNumber,
        log: log
      });
    } else {
      gameObj.update({
        currentPlayer: null,
        currentNumber: newMoveObject.nextNumber,
        log: log,
        status: "completed",
        winner: user
      });
    }
  };

  const _handleUserRegistration = user => {
    let playerList = currentGame.players;
    playerList.push(user);

    gameObj.update({
      currentPlayer: user,
      players: playerList,
      status: "inprogress"
    });
    setUser(user);
    // sessionStorage.setItem("user", JSON.stringify(user));
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
          onClick={() => _handleGameMoves(-1)}
        >
          -1
        </button>
        <button
          className="user-control-btn"
          disabled={disabled}
          onClick={() => _handleGameMoves(0)}
        >
          0
        </button>
        <button
          className="user-control-btn"
          disabled={disabled}
          onClick={() => _handleGameMoves(1)}
        >
          +1
        </button>
      </div>
    );
  };

  const whoIsPlaying = () => {
    if (
      currentGame &&
      currentGame.currentPlayer &&
      currentGame.currentPlayer.email === user.email
    ) {
      return "You";
    } else {
      return "Opponent";
    }
  };

  return (
    <div className="game-wrap">
      <GameShareLink />
      <GameHeader
        players={currentGame ? currentGame.players : null}
        whoIsPlaying={whoIsPlaying()}
      />
      <GameMoves log={currentGame ? currentGame.log : []} />
      {_renderUserControls()}
      <RegistrationForm
        show={showForm}
        newGame={false}
        onHide={() => showRegistrationForm(false)}
        register={_handleUserRegistration}
      />
    </div>
  );
}

export default Game;
