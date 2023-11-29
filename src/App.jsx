import { useState } from "react"
import NewGame from "./components/NewGame"
import Game from "./components/Game"
import GameOver from "./components/GameOver"
import { levels } from './levels'

function App() {
  const [player, setPlayer] = useState()
  const [circles, setCircles] = useState([])
  const [score, setScore] = useState(100)
  const [gameLaunch, setGameLaunch] = useState(true)
  const [gameOn, setGameOn] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const gameSetHandler = (level, name) => {
    const levelIndex = levels.findIndex(el => el.name === level);
    const levelAmount = levels[levelIndex].amount;
    const circlesArray = Array.from({ length: levelAmount }, (x, i) => i);

    setCircles(circlesArray)
    setPlayer(
      {
        level: level,
        name: name
      }
    )
    setGameLaunch(!gameLaunch)
    setGameOn(!gameOn)
  }

  const stopHandler = () => {
    setGameOn(!gameOn)
    setGameOver(!gameOver)
  }

  const closeHandler = () => {
    setGameOver(!gameOver)
    setGameLaunch(!gameLaunch)
    setScore(0)
  }

  return (
    <>
      <h1>Catch the snow!</h1>
      {gameLaunch && <NewGame onclick={gameSetHandler} />}
      {gameOn && <Game score={score} circles={circles} stopHandler={stopHandler} />}
      {gameOver && <GameOver closeHandler={closeHandler} {...player} score={score}/>}
    </>
  )
}

export default App
