import React from "react";

function GameOver({ closeHandler, name, score, level }) {
  let message = "";
  if (score >= 70) {
    message = "Well done! You caught a lot of snow!";
  } else if (score >= 30) {
    message = "Keep practicing! You can catch more snow!";
  } else {
    message = "Oops!Try it again!";
  }

  return (
    <div className="overlay">
      <div className="gameover_box">
        <h2>GAME OVER</h2>
        <div className="game_info">
          <p>Player: {name}</p>
          <p className="score">Score: {score}</p>
          <p>Level: {level}</p>
        </div>
        <p>{message}</p>
        <button onClick={closeHandler}>X</button>
      </div>
    </div>
  );
}

export default GameOver;
