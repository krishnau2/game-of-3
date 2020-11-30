import React from "react";

import { gameStatus } from "../services/gameConstants";

const GameControls = props => {
  let currentGame = props.currentGame;
  let user = props.user;

  const _isOnlyOnePlayerAvailable = () => {
    return currentGame && currentGame.players.length !== 2;
  };

  const _isGameEnded = () => {
    return currentGame && currentGame.status === gameStatus.ended;
  };

  const shouldEnableGameControl = () => {
    let controlStatus = "disabled";
    if (
      currentGame &&
      currentGame.currentPlayer &&
      currentGame.currentPlayer.email === user.email
    ) {
      controlStatus = "";
    }

    if (_isOnlyOnePlayerAvailable()) {
      controlStatus = "disabled";
    }

    if (_isGameEnded()) {
      controlStatus = "disabled";
    }

    return controlStatus;
  };

  const _renderUserControls = () => {
    let conrolStatus = shouldEnableGameControl();

    return (
      <div className="user-control-wrap">
        <button
          className="user-control-btn"
          disabled={conrolStatus}
          onClick={() => props.handleGameMoves(-1)}
        >
          -1
        </button>
        <button
          className="user-control-btn"
          disabled={conrolStatus}
          onClick={() => props.handleGameMoves(0)}
        >
          0
        </button>
        <button
          className="user-control-btn"
          disabled={conrolStatus}
          onClick={() => props.handleGameMoves(1)}
        >
          +1
        </button>
      </div>
    );
  };

  return <div>{_renderUserControls()}</div>;
};

export default GameControls;
