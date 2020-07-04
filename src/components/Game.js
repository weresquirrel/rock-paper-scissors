import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

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

  const initialStatistics = {[Outcomes.WIN]: 0, [Outcomes.LOSE]: 0, [Outcomes.DRAW]: 0}
  const [statistics, setStatistics] = useState(initialStatistics)
  const total = statistics[Outcomes.WIN] + statistics[Outcomes.LOSE] + statistics[Outcomes.DRAW]

  function pickRandomChoice(options) {
    const keys = Object.keys(options)
    return options[keys[Math.floor(Math.random() * 3)]]
  }

  function decideOutcome(player, computer) {
    // console.log(player, computer)

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

    setStatistics((prev) => ({
      ...prev,
      [result]: prev[result] + 1
    }))

    setIsGameRunning(true) 
  }

  function newGame() {
    setComputersChoice('')
    setPlayersChoice('')
    setOutcome('')
    setIsGameRunning(false)
  }

  // --------------------------------------------
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridTemplateRows: 'repeat(3, 1fr)',
      gridGap: theme.spacing(3),

      margin: '2em',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }))
  // --------------------------------------------
  const classes = useStyles();
  return (
    <div className={classes.container}>



        {/* Computer's choice */}
        <div style={{ gridColumnEnd: '11', gridColumnStart: '3'}}>
          <Paper className={classes.paper}>
            <p>Computer's choice:</p>
            <p>
              {computersChoice ? computersChoice : '???'}
            </p>
          </Paper>
        </div>

        {/* statistics */}
        <div style={{ gridColumnEnd: 'span 2',  gridColumnStart: '11', gridRow: 'span 2'  }}>
          <Paper className={classes.paper}>
            <h3>Statistics</h3>
            <p>win: {statistics[Outcomes.WIN]}</p>
            <p>lose: {statistics[Outcomes.LOSE]}</p>
            <p>draw: {statistics[Outcomes.DRAW]}</p>
            <br/>
            <p>total: {total}</p>
          </Paper>
        </div>  

        {/* Player's choice */}
        <div style={{ gridColumnEnd: '11', gridColumnStart: '3'}}>
          <Paper className={classes.paper}>
            <Button className='special' variant="contained" size='large' >Hello World</Button>

            {Object.keys(Signs).map(signKey => 
              <Option
                key={`option-${signKey}`} 
                sign={Signs[signKey]} 
                onActivate={runGame} 
                isActivatable={isGameRunning} 
                activatedChoice={playersChoice}
              />
            )}
          </Paper>
        </div>

        {/* Outcome info + restart */}
        <div style={{ gridColumnEnd: 'span 12' }}>
          <Paper className={classes.paper}>
            {isGameRunning ? 
              <div> 
                <p>{outcome}</p>
                <button onClick={newGame}>Play again</button>
              </div> : 
              null
            }
          </Paper>
        </div>



    </div>
  )
}

export default Game
