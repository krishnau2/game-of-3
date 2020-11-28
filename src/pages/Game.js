import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";

const secondUser = { name: "playerB", email: "b@b.com", type: "user" };

function Game() {
  const [user, setUser] = useState("");
  const [currentGame, setCurrentGame] = useState(null);
  let { gameId } = useParams();

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  const _handleUserName = e => {
    console.log(e.target.value);
    setUser(e.target.value);
  };

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
      return currentGame.log.map((item, index) => {
        return <li key={index}>{item.startingNumber}</li>;
      });
    }
  };

  const _handleUserInput = input => {
    console.log("You pressed: ", input);
  };

  const _renderUserControls = () => {
    let disabled = "disabled";
    if (currentGame && currentGame.currentPlayer === user) {
      disabled = "";
    }

    return (
      <div>
        <button disabled={disabled} onClick={() => _handleUserInput(-1)}>
          -1
        </button>
        <button disabled={disabled} onClick={() => _handleUserInput(0)}>
          0
        </button>
        <button disabled={disabled} onClick={() => _handleUserInput(1)}>
          +1
        </button>
      </div>
    );
  };

  return (
    <div className="Game">
      <div>
        User:{" "}
        <input type="text" onChange={e => _handleUserName(e)} value={user} />
      </div>
      <h2>Game Area... Id: {gameId}</h2>
      <div>
        <ul>{renderLogItems()}</ul>
      </div>
      {_renderUserControls()}
    </div>
  );
}

export default Game;
