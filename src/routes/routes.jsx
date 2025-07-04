// Définition des routes principales de l'application avec React Router

import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/404";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecetteVitrinePage from "../pages/recette/RecetteVitrinePage";
import RecetteSaleesPage from "../pages/recette/RecetteSaleesPage";
import RecetteSucreesPage from "../pages/recette/RecetteSucreesPage";
import RecetteDetailPage from "../pages/recette/RecetteDetailPage";
import ActiviteVitrinePage from "../pages/activite/ActiviteVitrinePage";
import ActiviteInterieurPage from "../pages/activite/ActiviteInterieurPage";
import ActiviteExterieurPage from "../pages/activite/ActiviteExterieurPage";
import ActiviteDetailPage from "../pages/activite/ActiviteDetailPage";
import AccueilAmaePage from "../pages/AccueilAmaePage";
import BlogPage from "../pages/BlogPage";
// import MoodboardListPage from "../pages/moodboard/MoodboardListPage";
// import MoodboardDetailPage from "../pages/moodboard/MoodboardDetailPage";
import SmartDealListPage from "../pages/smartDeal/SmartDealListPage";
import SmartDealDetailPage from "../pages/smartDeal/SmartDealDetailPage";
// import HomePage from "../pages/HomePage";
// import { RecipePage } from "../pages/RecipePage";
import CalendarPage from "../pages/CalendarPage";
import FriendsPage from "../pages/FriendsPage";

// Déclaration du routeur avec les différentes routes accessibles
const router = createBrowserRouter([
  { 
    path: "/", 
    element: <AccueilAmaePage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/blog", 
    element: <BlogPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/login", 
    element: <LoginPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/register", 
    element: <RegisterPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/recettes", 
    element: <RecetteVitrinePage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/recettes/salees", 
    element: <RecetteSaleesPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/recettes/sucrees", 
    element: <RecetteSucreesPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/recette/:id", 
    element: <RecetteDetailPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/activites", 
    element: <ActiviteVitrinePage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/activites/interieur", 
    element: <ActiviteInterieurPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/activites/exterieur", 
    element: <ActiviteExterieurPage />, 
    errorElement: <ErrorPage /> 
  },
  { 
    path: "/activite/:id", 
    element: <ActiviteDetailPage />, 
    errorElement: <ErrorPage /> 
  },
  // {
  //   path: "/moodboard",
  //   element: <MoodboardListPage />,
  //   errorElement: <ErrorPage />
  // },
  // {path: "/moodboard/:id",
  //   element: <MoodboardDetailPage />,
  //   errorElement: <ErrorPage />
  // },
  {path: "/smart_Deal",
    element: <SmartDealListPage />,
    errorElement: <ErrorPage />
  },
  {path: "/smart_Deal/:id",
    element: <SmartDealDetailPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/calendrier",
    element: <CalendarPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/amis",
    element: <FriendsPage />,
    errorElement: <ErrorPage />
  }
]);

export default router;
