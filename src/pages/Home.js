import React, { useState } from "react";
import { db } from "../services/firebase";
import Button from "react-bootstrap/Button";

import RegistrationForm from "../components/RegistrationForm";
import { gameStatus } from "../services/gameConstants";

function Home(props) {
  const [modalShow, setModalShow] = React.useState(false);

  const createGame = async () => {
    let currentUser = JSON.parse(sessionStorage.getItem("user"));
    let startingNumber = parseInt(currentUser.startingNumber);

    let newGameObject = {
      startingNumber: startingNumber,
      currentNumber: startingNumber,
      currentPlayer: currentUser,
      createdBy: currentUser,
      winner: null,
      players: [currentUser],
      status: gameStatus.waiting,
      log: [
        {
          player: currentUser,
          inputNumber: null,
          startingNumber: startingNumber,
          divisibleByThree: null,
          nextNumber: startingNumber
        }
      ]
    };

    let newGame = await db.push(newGameObject);
    props.history.push(`/game/${newGame.key}`);
  };

  const _handleUserRegistration = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    createGame();
    setModalShow(false);
  };

  return (
    <div className="Home">
      <div className="app-name">
        <h2>Game of 3</h2>
      </div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        New Game
      </Button>
      <div className="game-rules">
        <h2>Game Rules</h2>
        <ul>
          <li>First Player starts with a random number.</li>
          <li>
            Then Second Player need to chose from (-1, 0, +1) to make the numer
            divisible by 3.
          </li>
          <li>
            Then a new number is formed by dividing current number by 3 and
            passed to the First player.
          </li>
          <li>
            The above steps continues until a player reaches 1 after dividing by
            3, and that player wins the game.
          </li>
        </ul>
      </div>

      <RegistrationForm
        show={modalShow}
        newGame={true}
        onHide={() => setModalShow(false)}
        register={_handleUserRegistration}
      />
    </div>
  );
}

export default Home;
