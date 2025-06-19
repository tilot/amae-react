/* fichier 404.jsx */
import React from "react";
import { useRouteError } from "react-router-dom";
import './404.css';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page-404">
      <div className="error-box-404">
        <h1 className="error-title-404">Oups !</h1>
        <p className="error-message-404">Désolé, une erreur inattendue s'est produite.</p>
        {error && (
          <p className="error-detail-404">
            <i>{error.statusText || error.message}</i>
          </p>
        )}
      </div>
    </div>
  );
}
            