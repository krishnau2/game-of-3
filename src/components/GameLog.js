import React from "react";

const allowedInputValues = [-1, 0, 1];

const GameLog = props => {
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
      return (
        <div className="game-expression">
          [({item.inputNumber} + {item.startingNumber}) / 3 ] ={" "}
          {item.nextNumber}
        </div>
      );
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
          <div className="user">{item.player}</div>
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

  return <div>{renderLogItems()}</div>;
};

export default GameLog;
