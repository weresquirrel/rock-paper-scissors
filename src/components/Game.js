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

  function runGame(sign) {
    const player = sign
    const computer = pickRandomChoice(Signs)
    const result = decideOutcome(player, computer)

    setPlayersChoice(player)
    setComputersChoice(computer)
    setOutcome(result)

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
      {Object.keys(Signs).map(singKey => 
        <Option
          key={`option-${singKey}`} 
          sign={Signs[singKey]} 
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
    </div>
  )
}

export default Game
