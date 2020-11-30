import React from "react";

const allowedInputValues = [-1, 0, 1];

const GameMoves = props => {
  const renderUserInput = item => {
    if (item.inputNumber || allowedInputValues.includes(item.inputNumber)) {
      return (
        <div className="user-input-value">
          <span>{item.inputNumber}</span>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderExpression = item => {
    if (item.inputNumber || allowedInputValues.includes(item.inputNumber)) {
      let expression = `[(${item.inputNumber} + ${item.startingNumber}) / 3 ] = ${item.nextNumber}`;
      let highlighter = item.divisibleBy3
        ? "divisible-by-three"
        : "not-divisible-by-three";

      if (item.divisibleBy3) {
        return (
          <div className="game-expression divisible-by-three">{expression}</div>
        );
      } else {
        return (
          <div className="game-expression not-divisible-by-three">
            {expression}
          </div>
        );
      }
    } else {
      return null;
    }
  };

  const renderLogItems = () => {
    console.log("Game Log: ", props.log);

    return props.log.map((item, index) => {
      let alignment = index % 2 === 0 ? "left-align" : "right-align";

      return (
        <div key={index} className={`log-item-wrap ${alignment}`}>
          {/* <div className="user">{item.player.username}</div> */}
          <div className="info">
            {renderUserInput(item)}
            {renderExpression(item)}
            <div className="next-number">
              <span>{item.nextNumber}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  return <div className="game-moves-container">{renderLogItems()}</div>;
};

export default GameMoves;
