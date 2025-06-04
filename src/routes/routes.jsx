// Définition des routes principales de l'application avec React Router
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/404";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import RecetteVitrinePage from "../pages/RecetteVitrinePage";
import RecetteSaleesPage from "../pages/RecetteSaleesPage";
import RecetteSucreesPage from "../pages/RecetteSucreesPage";
import RecetteDetailPage from "../pages/RecetteDetailPage";
import ActiviteVitrinePage from "../pages/ActiviteVitrinePage";
import ActiviteInterieurPage from "../pages/ActiviteInterieurPage";
import ActiviteExterieurPage from "../pages/ActiviteExterieurPage";
import ActiviteDetailPage from "../pages/ActiviteDetailPage";
import MoodboardListPage from "../pages/MoodboardListPage";
import MoodboardDetailPage from "../pages/MoodboardDetailPage";
import SmartDealListPage from "../pages/SmartDealListPage";
import SmartDealDetailPage from "../pages/SmartDealDetailPage";
// import HomePage from "../pages/HomePage";
// import { RecipePage } from "../pages/RecipePage";

// Déclaration du routeur avec les différentes routes accessibles
const router = createBrowserRouter([
  { 
    path: "/", 
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
  {
    path: "/moodboard",
    element: <MoodboardListPage />,
    errorElement: <ErrorPage />
  },
  {path: "/moodboard/:id",
    element: <MoodboardDetailPage />,
    errorElement: <ErrorPage />
  },
  {path: "/smart_Deal",
    element: <SmartDealListPage />,
    errorElement: <ErrorPage />
  },
  {path: "/smart_Deal/:id",
    element: <SmartDealDetailPage />,
    errorElement: <ErrorPage />
  }
]);

export default router;
