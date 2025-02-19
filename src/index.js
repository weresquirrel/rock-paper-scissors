import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as firebase from 'firebase/app'

const config = {
  apiKey: 'AIzaSyBV4CXMmv7KpmeyQrY6TJtNIN6pPllPYo0',
  authDomain: 'rock-paper-scissors-70513.firebaseapp.com',
  databaseURL: 'https://rock-paper-scissors-70513.firebaseio.com',
  projectId: 'rock-paper-scissors-70513',
  storageBucket: 'rock-paper-scissors-70513.appspot.com',
  messagingSenderId: '426951715279',
  appId: '1:426951715279:web:9e6601f153cf16968bcaba',
}

// Initialize Firebase
const app = firebase.initializeApp(config)

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <React.StrictMode>
    <App firebaseApp={app} />
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
