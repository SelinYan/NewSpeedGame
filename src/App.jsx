import { useState } from "react"
import NewGame from "./components/NewGame"
import Circle from "./UI_components/Circle"
import Game from "./components/Game"
import { levels } from './levels'

function App() {
  const [player, setPlayer] = useState()
  const [circles, setCircles] = useState([])
  const [score, setScore] = useState(10)

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
  }

  return (
    <>
      <h1>Catch the snow!</h1>
      <NewGame onclick={gameSetHandler} />
      <Game score={score} circles={circles} />
    </>
  )
}

export default App
