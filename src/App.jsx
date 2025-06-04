// Composant racine de l'application (exemple Vite + React)
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginButton from './components/LoginButton/LoginButton.jsx'
import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import HomePage from './components/HomePage/HomePage'
import Footer_Gros from './components/Footer/Footer_Gros.jsx'
import './App.css'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
    </Router>
    <Footer_Gros />
    </>
  )
}

export default App
