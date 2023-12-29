import React, { useState } from "react";

function NewGame({ onclick }) {
  const [name, setName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("easy");

  const inputHandler = (e) => {
    setName(e.target.value);
  };

  const levelSelectHandler = (level) => {
    setSelectedLevel(level);
  };

  const startGame = () => {
    onclick(selectedLevel, name);
  };

  return (
    <div>
      <h2>Start a game by choosing difficulty and entering your name</h2>
      <input
        type="text"
        placeholder="Enter your name"
        onChange={inputHandler}
      />
      <div>
        <button onClick={() => levelSelectHandler("easy")}>Easy</button>
        <button onClick={() => levelSelectHandler("medium")}>Medium</button>
        <button onClick={() => levelSelectHandler("hard")}>Hard</button>
      </div>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default NewGame;
