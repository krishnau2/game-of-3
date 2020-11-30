import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";\

import {
  _isCurrentUserIsValidPlayer,
  _isCurrentPlayerIsTheWinner
} from "../services/util";

const GameEndedMessage = props => {
  let user = props.user;
  let currentGame = props.currentGame;
  let winner = null;

  if (currentGame && currentGame.winner) {
    winner = currentGame.winner;
  }

  let message = `Game ended, ${winner && winner.username} won the game`;

  return (
    <Modal {...props} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Game Ended</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h2>{message}</h2>
        </div>
        <Button onClick={props.redirectToHome}>Start new Game</Button>
      </Modal.Body>
    </Modal>
  );
};

export default GameEndedMessage;
