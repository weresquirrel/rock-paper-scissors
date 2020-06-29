import React, {useState} from 'react';
import './App.css';

function App() {
  // should break the whole thing to Components
  // const basicOptions = ['rock', 'paper', 'scissors']

  const Signs = {
    ROCK: 'rock',
    PAPER: 'paper',
    SCISSORS: 'scissors'
  }
// No idea how will this Signs thing handle 'lizard' and 'Spock' later
// Will be another enum for that?
// and why must Sings start with a capital - so strange?

  const Outcomes = {
    WIN: 'win',
    LOSE: 'lose',
    DRAW: 'draw'
  }


  const [isGameRunning, setIsGameRunning] = useState(false)
  const [outcome, setOutcome] = useState('')
  const [computersChoice, setComputersChoice] = useState('')
  const [playersChoice, setPlayersChoice] = useState('')

  // function pickRandomChoiceOLD(options) {
  //   return options[Math.floor(Math.random() * 3)]
  // }

  // I don't know how this supposed to work with the enum,
  // honestly just seems more complicated than it was with the array
  //  I wanted to change the hardcoded 3 to options.length before -
  //  Now it doesn't make any sense, I have no idea how we wannt to handle these keyes later
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

  function runGame(e) {
    const player = e.target.id
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
          // onClick={() => runGame('rock')}
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
