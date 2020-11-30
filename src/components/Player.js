import React from "react";
import { ReactComponent as Logo } from "../svg/user.svg";

const Player = props => {
  let player = props.user ? props.user : null;
  let username = player ? player.username : "--";
  return (
    <div className={`player ${props.position}`}>
      {/* <img src="" /> */}
      <Logo />
      <div className="username">{username}</div>
    </div>
  );
};

export default Player;
