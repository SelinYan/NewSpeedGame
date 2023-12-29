import React, { useRef, useState } from "react";
import NewGame from "./components/NewGame";
import OnGame from "./components/OnGame";
import GameOver from "./components/GameOver";
import { levels } from "./levels";

const getRndInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function App() {
  const [player, setPlayer] = useState(null);
  const [circles, setCircles] = useState([]);
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [gameLaunch, setGameLaunch] = useState(true);
  const [gameOn, setGameOn] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  // we use useRef to store the value between renders
  const timeoutIdRef = useRef(null);
  const roundsCount = useRef(0);
  const currentInst = useRef(0);

  let pace = 1000;
  let levelAmount;

  const gameSetHandler = (level, name) => {
    // findIndex() from array based on level name and then reading amount from object
    // const levelIndex = levels.findIndex((el) => el.name === level);
    // levelAmount = levels[levelIndex].amount;

    // find() matching name and destructuring the amount
    const { amount } = levels.find((el) => el.name === level);
    levelAmount = amount;

    const circlesArray = Array.from({ length: levelAmount }, (_, i) => i);

    setCircles(circlesArray);
    setPlayer({
      level: level,
      name: name,
    });

    // using the callback to ensure that we have the latest state
    setGameLaunch(false);
    gameStart();
  };

  const randomNumb = () => {
    if (roundsCount.current >= 3) {
      stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInt(0, levelAmount);
    } while (nextActive === currentInst.current);

    setCurrent(nextActive);
    currentInst.current = nextActive;
    roundsCount.current++;
    pace *= 0.95;
    timeoutIdRef.current = setTimeout(randomNumb, pace);
  };

  const gameStart = () => {
    setScore(0);
    setCurrent(null);
    roundsCount.current = 0;
    setGameOn(true);
    randomNumb();
  };

  const clickHandler = (id) => {
    if (current !== id) {
      stopHandler();
      return;
    }
    setScore((prevScore) => prevScore + 10);
    roundsCount.current--;
  };

  const stopHandler = () => {
    clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = null;

    setGameOn(false);
    setGameOver(true);
  };

  const closeHandler = () => {
    setGameOver(false);
    setGameLaunch(true);
    setScore(0);
  };

  return (
    <>
      <h1>Catch the snow!</h1>
      {gameLaunch && <NewGame onclick={gameSetHandler} />}
      {gameOn && (
        <OnGame
          score={score}
          circles={circles}
          stopHandler={stopHandler}
          clickHandler={clickHandler}
          current={current}
        />
      )}
      {gameOver && (
        <GameOver closeHandler={closeHandler} {...player} score={score} />
      )}
    </>
  );
}

export default App;
