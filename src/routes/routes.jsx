// Définition des routes principales de l'application avec React Router
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/404";
import LoginPage from "../pages/LoginPage";
import RecetteVitrinePage from "../pages/RecetteVitrinePage";
import RecetteDetailPage from "../pages/RecetteDetailPage";
// import HomePage from "../pages/HomePage";
// import { RecipePage } from "../pages/RecipePage";

// Déclaration du routeur avec les différentes routes accessibles
const router = createBrowserRouter([
     
          { path: "/", 
               element: <LoginPage />, errorElement: <ErrorPage /> },
          { path: "/recettevitrine",
               element: <RecetteVitrinePage />, errorElement: <ErrorPage /> },
          { path: "/recettedetail",
               element: <RecetteDetailPage />, errorElement: <ErrorPage /> } 

]);

export default router;
