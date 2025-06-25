import React from 'react';
import FooterGros from '../components/Footer/Footer_Gros';
import logoPapillon from '../assets/images/logo/noir.png';
import mainImage from '../assets/images/acceuil_image.jpg';
import { Link } from 'react-router-dom';
import './AccueilAmaePage.css';

const AccueilAmaePage = () => {
  return (
    <div className="accueil-amae-container">
      {/* En-tête */}
      <header className="accueil-header">
        <img src={logoPapillon} alt="Logo papillon Amaé" className="accueil-logo" />
        <div className="accueil-header-actions">
          <Link to="/blog" className="accueil-login">Blog</Link>
          <Link to="/login" className="accueil-register">Se connecter</Link>
        </div>
      </header>

      {/* Image principale avec texte */}
      <div className="accueil-main-image-container">
        <img src={mainImage} alt="Maman et enfant Amaé" className="accueil-main-image" />
        <div className="accueil-main-image-text">
          <p>AMAÉ, votre aide au quotidien pour simplifier la vie de famille et trouver des solutions adaptées à vos besoins.</p>
        </div>
      </div>

      {/* Contenu texte */}
      <main className="accueil-content">
        <h2>AMAÉ votre aide au quotidien.</h2>
        <p>
          Une des fonctionnalités d'AMAÉ, c'est de vous aider dans votre vie de famille, en vous proposant des solutions adaptées à vos besoins, que ce soit pour organiser des activités, gérer votre calendrier, ou encore trouver des bons plans et des recettes.
        </p>
        <p>
          AMAÉ centralise toutes les informations dont vous avez besoin, afin de vous faire gagner du temps et de l'énergie au quotidien. Notre objectif : vous simplifier la vie !
        </p>
        <p>
          Le tout en créant une communauté, où le partage et le bien-être sont au cœur de notre service.
        </p>
        <h3>Mais laquelle ?</h3>
        <p>
          Une aide à l'organisation et à la recherche d'informations pour les familles, les parents et les enfants.
        </p>
        <h3>LE CONCEPT</h3>
        <p>
          AMAÉ est une application du quotidien dédiée aux familles : organisation, activités, bons plans, recettes, gestion du calendrier, notifications personnalisées, tout est pensé pour vous accompagner chaque jour.
        </p>
        <p>
          Grâce à une interface simple et intuitive, vous accédez en quelques clics à toutes les fonctionnalités essentielles pour faciliter votre quotidien. AMAÉ, c'est aussi une communauté bienveillante, où l'entraide et le partage sont au centre de l'expérience.
        </p>
      </main>

      {/* Footer */}
      <FooterGros />
    </div>
  );
};

export default AccueilAmaePage; 