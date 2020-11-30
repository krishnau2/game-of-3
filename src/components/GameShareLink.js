import React from "react";
import Button from "react-bootstrap/Button";

const GameShareLink = () => {
  const currentUrl = window.location.href;

  const copyToClipboard = () => {
    var textField = document.createElement("textarea");
    textField.innerText = currentUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  return (
    <div className="shareable-link-wrap">
      <span className="shareable-link">{currentUrl}</span>
      {/* <button onClick={copyToClipboard}>Copy</button> */}
      <Button onClick={copyToClipboard} variant="outline-dark" size="sm">
        Copy
      </Button>
    </div>
  );
};

export default GameShareLink;
