// Composant racine de l'application (exemple Vite + React)
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginButton from './components/LoginButton/LoginButton.jsx'

function App() {
  // État local pour le compteur d'exemple
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* Bouton de connexion (commenté ici, à activer si besoin) */}
        // <LoginButton/>
        {/* Liens vers les sites Vite et React avec leurs logos */}
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* Titre principal */}
      <h1>Vite + React</h1>
      <div className="card">
        {/* Bouton qui incrémente le compteur */}
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      {/* Lien d'information */}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
