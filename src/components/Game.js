import React, { useState } from 'react'

import Option from './Option'

const Signs = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
}

const Outcomes = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw',
}

function Game() {
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [outcome, setOutcome] = useState('')
  const [computersChoice, setComputersChoice] = useState('')
  const [playersChoice, setPlayersChoice] = useState('')

  const initialStatistics = {
    [Outcomes.WIN]: 0,
    [Outcomes.LOSE]: 0,
    [Outcomes.DRAW]: 0,
  }
  const [statistics, setStatistics] = useState(initialStatistics)
  const total =
    statistics[Outcomes.WIN] + statistics[Outcomes.LOSE] + statistics[Outcomes.DRAW]

  function pickRandomChoice(options) {
    const keys = Object.keys(options)
    return options[keys[Math.floor(Math.random() * 3)]]
  }

  function decideOutcome(player, computer) {
    // console.log(player, computer)

    if (player === computer) {
      return Outcomes.DRAW
    } else if (
      (player === Signs.ROCK && computer === Signs.PAPER) ||
      (player === Signs.PAPER && computer === Signs.SCISSORS) ||
      (player === Signs.SCISSORS && computer === Signs.ROCK)
    ) {
      return Outcomes.LOSE
    } else {
      return Outcomes.WIN
    }
  }

  function runGame(player) {
    const computer = pickRandomChoice(Signs)
    const result = decideOutcome(player, computer)

    setPlayersChoice(player)
    setComputersChoice(computer)
    setOutcome(result)

    setStatistics((prev) => ({
      ...prev,
      [result]: prev[result] + 1,
    }))

    setIsGameRunning(true)
  }

  function newGame() {
    setComputersChoice('')
    setPlayersChoice('')
    setOutcome('')
    setIsGameRunning(false)
  }

  return (
    <div>
      {/* Computer's choice */}
      <div>
        <p>Computer's choice:</p>
        <p>{computersChoice ? computersChoice : '???'}</p>
      </div>

      {/* Player's choice */}
      {Object.keys(Signs).map((signKey) => (
        <Option
          key={`option-${signKey}`}
          sign={Signs[signKey]}
          onActivate={runGame}
          isActivatable={isGameRunning}
          activatedChoice={playersChoice}
        />
      ))}

      {/* Outcome info + restart */}
      {isGameRunning ? (
        <div>
          <p>{outcome}</p>
          <button onClick={newGame}>Play again</button>
        </div>
      ) : null}

      {/* statistics */}
      <div>
        <h3>Statistics</h3>
        <p>win: {statistics[Outcomes.WIN]}</p>
        <p>lose: {statistics[Outcomes.LOSE]}</p>
        <p>draw: {statistics[Outcomes.DRAW]}</p>
        <br />
        <p>total: {total}</p>
      </div>
    </div>
  )
}

export default Game
