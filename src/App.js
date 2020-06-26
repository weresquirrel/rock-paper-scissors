import React, {useState} from 'react';
import './App.css';

function App() {
  // should break the whole thing to Components
  const basicOptions = ['rock', 'paper', 'scissors']

  const [isGameRunning, setIsGameRunning] = useState(false)
  const [outcome, setOutcome] = useState('')
  const [computersChoice, setComputersChoice] = useState('')
  const [playersChoice, setPlayersChoice] = useState('')

  function pickRandomChoice(options) {
    return options[Math.floor(Math.random() * 3)]
  }

  function decideOutcome(player, computer) {

    console.log(player, computer)

    if(player === computer) {
      return 'draw'
    } else if (
        (player === 'rock' && computer === 'paper') ||
        (player === 'paper' && computer === 'scissors') ||
        (player === 'scissors' && computer === 'rock')
      ) {
      return 'lose'
    } else {
      return 'win'
    }

  }

  function runGame(e) {
    const player = e.target.id
    const computer = pickRandomChoice(basicOptions)
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

        {/* 
          Player's choice 
          - until restart all buttons should be disabled
          - selected button should stay visually selected
          -- focuse vs special className ?

          - not sure if id was the right choice
        */}
        <button 
          id='rock' 
          disabled={isGameRunning} 
          onClick={runGame}
          className={playersChoice === 'rock'? 'selected' : null}
        >
          rock
        </button>

        <button 
          id='paper' 
          disabled={isGameRunning} 
          onClick={runGame}
          className={playersChoice === 'paper'? 'selected' : null}
        >
          paper
        </button>

        <button 
          id='scissors' 
          disabled={isGameRunning} 
          onClick={runGame}
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
