import React from "react";
import Player from "./Player";

const GameHeader = props => {
  let firstPlayer = props.players ? props.players[0] : null;
  let secondPlayer = props.players ? props.players[1] : null;
  return (
    <div className="game-header">
      <Player user={firstPlayer} position="left-pos" />
      <div className="player-status">{props.whoIsPlaying}</div>
      <Player user={secondPlayer} position="right-pos" />
    </div>
  );
};

export default GameHeader;
