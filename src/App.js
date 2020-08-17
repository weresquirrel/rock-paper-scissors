import React, { useEffect, useState } from 'react'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import './App.css'
import Game from './components/Game'

const provider = new firebase.auth.GoogleAuthProvider()

const Login = () => {
  const onLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .catch((error) => console.log(`Login error: ${error}`))
  }

  return <button onClick={onLogin}>Login</button>
}

const Logout = ({ user }) => {
  return (
    <>
      <p>{user.displayName}</p>
      <button
        onClick={() => {
          firebase.auth().signOut()
        }}
      >
        Log out
      </button>
    </>
  )
}

function App() {
  const [user, setUser] = useState('no info')

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => setUser(u))
  }, [])

  return (
    <div className="App">
      <header>
        <h1>o — x</h1>
      </header>
      <main>
        {user === 'no info' ? (
          <p>loading...</p>
        ) : user === null ? (
          <Login />
        ) : (
          <Logout user={user} />
        )}
        <Game />
      </main>
    </div>
  )
}

export default App
