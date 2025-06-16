// Composant racine de l'application (exemple Vite + React)
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginButton from './components/LoginButton/LoginButton.jsx'
import LoginForm from './components/LoginForm/LoginForm'
import RegisterForm from './components/RegisterForm/RegisterForm'
import HomePage from './components/HomePage/HomePage'
import Footer_Gros from './components/Footer/Footer_Gros.jsx'
import MainLayout from './components/Layout/MainLayout'
import RecetteSaleesPage from './pages/recette/RecetteSaleesPage'
import RecetteSucreesPage from './pages/recette/RecetteSucreesPage'
import RecetteDetailPage from './pages/recette/RecetteDetailPage'
import ActiviteInterieurPage from './pages/activite/ActiviteInterieurPage'
import ActiviteExterieurPage from './pages/activite/ActiviteExterieurPage'
import ActiviteDetailPage from './pages/activite/ActiviteDetailPage'
import CalendarPage from './pages/CalendarPage'
import MonComptePage from './pages/MonComptePage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil sans NavBar */}
        <Route path="/" element={<HomePage />} />
        
        {/* Routes avec NavBar */}
        <Route element={<MainLayout />}>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/recettes" element={<Navigate to="/recettes/salees" replace />} />
          <Route path="/recettes/salees" element={<RecetteSaleesPage />} />
          <Route path="/recettes/sucrees" element={<RecetteSucreesPage />} />
          <Route path="/recettes/:id" element={<RecetteDetailPage />} />
          <Route path="/activites" element={<Navigate to="/activites/interieur" replace />} />
          <Route path="/activites/interieur" element={<ActiviteInterieurPage />} />
          <Route path="/activites/exterieur" element={<ActiviteExterieurPage />} />
          <Route path="/activites/:id" element={<ActiviteDetailPage />} />
          <Route path="/calendrier" element={<CalendarPage />} />
          <Route path="/mon-compte" element={<MonComptePage />} />
        </Route>

        {/* Route par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer_Gros />
    </Router>
  )
}

export default App
