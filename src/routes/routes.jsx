import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/404";
import LoginPage from "../pages/LoginPage";
// import HomePage from "../pages/HomePage";
// import { RecipePage } from "../pages/RecipePage";

const router = createBrowserRouter([
     { path: "/", element: <LoginPage />, errorElement: <ErrorPage /> },

//   { path: "/recette/:id", element: <RecipePage /> },  

]);

export default router;
