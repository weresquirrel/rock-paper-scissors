import React, { useEffect, useState } from 'react'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import './App.css'
import Game from './components/Game'

const Login = ({ auth, provider }) => {
  const onLogin = () => {
    signInWithPopup(auth, provider).catch((error) => console.log(`Login error: ${error}`))
  }

  return <button onClick={onLogin}>Login</button>
}

const Logout = ({ user, auth }) => {
  return (
    <>
      <p>{user.displayName}</p>
      <button
        onClick={() => {
          auth.signOut()
        }}
      >
        Log out
      </button>
    </>
  )
}

function App({ firebaseApp }) {
  const auth = getAuth(firebaseApp)

  const provider = new GoogleAuthProvider()

  const [user, setUser] = useState('no info')

  useEffect(() => {
    auth.onAuthStateChanged((u) => setUser(u))
  }, [auth])

  return (
    <div className="App">
      <header>
        <h1>o — x</h1>
      </header>
      <main>
        {user === 'no info' ? (
          <p>loading...</p>
        ) : user === null ? (
          <Login auth={auth} provider={provider} />
        ) : (
          <Logout auth={auth} user={user} />
        )}
        <Game />
      </main>
    </div>
  )
}

export default App
