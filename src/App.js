import React, {useState} from 'react';
import './App.css';

function App() {
  const [isGameRunning, setIsGameRunning] = useState(false)
  const [outcome, setOutcome] = useState('')
  const [computersChoice, setComputersChoice] = useState('')

  function runGame() {
    setComputersChoice('rock')
    setOutcome('win')
    setIsGameRunning(true) 
  }

  function newGame() {
    setComputersChoice('')
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
        <button onClick={runGame}>rock</button>
        <button onClick={runGame}>paper</button>
        <button onClick={runGame}>scissors</button>

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
