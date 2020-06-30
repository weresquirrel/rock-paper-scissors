import React, {useState} from 'react';
import './App.css';

function App() {

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
    <div className="App">
      <header>
        <h1>o — x</h1>
      </header>
      <main>
        {/* Computer's choice */}
        <div>
          <p>Computer's choice:</p>
          <p>
            {computersChoice ? computersChoice : '???'}
          </p>
          
        </div>

        {/* Player's choice */}
        <button 
          disabled={isGameRunning} 
          onClick={() => runGame(Signs.ROCK)}
          className={playersChoice === 'rock'? 'selected' : null}
        >
          rock
        </button>

        <button 
          disabled={isGameRunning} 
          onClick={() => runGame(Signs.PAPER)}
          className={playersChoice === 'paper'? 'selected' : null}
        >
          paper
        </button>

        <button 
          disabled={isGameRunning} 
          onClick={() => runGame(Signs.SCISSORS)}
          className={playersChoice === 'scissors'? 'selected' : null}
        >
          scissors
        </button>

        {/* Outcome info + restart */}
          {isGameRunning ? 
            <div> 
              <p>{outcome}</p>
              <button onClick={newGame}>Play again</button>
            </div> : 
            null
          }
          
      </main>
    </div>
  );
}

export default App;
