// Point d'entrée principal de l'application React
import React from "react";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.jsx";

// On monte l'application React dans l'élément #root du DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Fournit le routage à toute l'application */}
    <RouterProvider router={router} />
  </StrictMode>,
)
