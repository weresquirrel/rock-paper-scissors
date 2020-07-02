import React, {useState} from 'react'

import Option from './Option'

const Signs = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors'
}

const Outcomes = {
  WIN: 'win',
  LOSE: 'lose',
  DRAW: 'draw'
}

function Game() {
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [outcome, setOutcome] = useState('')
  const [computersChoice, setComputersChoice] = useState('')
  const [playersChoice, setPlayersChoice] = useState('')

  const initialStatistics = {win: 0, lose: 0, draw: 0, total: 0}
  const [statistics, setStatistics] = useState(initialStatistics)

  function pickRandomChoice(options) {
    const keys = Object.keys(options)
    return options[keys[Math.floor(Math.random() * 3)]]
  }

  function decideOutcome(player, computer) {
    console.log(player, computer)

    if(player === computer) {
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

    setStatistics(prev => {
      return {
        ...prev, 
        [result]: prev[result] + 1, 
        total: prev.total + 1
      }
    })

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
        <p>
          {computersChoice ? computersChoice : '???'}
        </p>
        
      </div>

      {/* Player's choice */}
      {Object.keys(Signs).map(signKey => 
        <Option
          key={`option-${signKey}`} 
          sign={Signs[signKey]} 
          onActivate={runGame} 
          isActivatable={isGameRunning} 
          activatedChoice={playersChoice}
        />
      )}

      {/* Outcome info + restart */}
      {isGameRunning ? 
        <div> 
          <p>{outcome}</p>
          <button onClick={newGame}>Play again</button>
        </div> : 
        null
      }

      {/* statistics */}
      <div>
        <h3>Statistics</h3>
        <p>win: {statistics.win}</p>
        <p>lose: {statistics.lose}</p>
        <p>draw: {statistics.draw}</p>
        <br/>
        <p>total: {statistics.total}</p>
      </div>

    </div>
  )
}

export default Game
