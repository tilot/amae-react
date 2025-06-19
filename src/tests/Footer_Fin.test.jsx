import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Footer_Fin from '../components/Footer/Footer_Fin';

// Mock des images
jest.mock('../../assets/images/icon/calendrier-lignes.svg', () => 'calendrier-icon');
jest.mock('../../assets/images/icon/activite.svg', () => 'activite-icon');
jest.mock('../../assets/images/icon/recette.svg', () => 'recette-icon');

describe('Footer_Fin', () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer_Fin />
      </BrowserRouter>
    );
  };

  test('devrait rendre le footer avec les trois liens de navigation', () => {
    renderFooter();
    
    // Vérifier que les trois liens sont présents
    expect(screen.getByText('Calendrier')).toBeInTheDocument();
    expect(screen.getByText('Activités')).toBeInTheDocument();
    expect(screen.getByText('Recettes')).toBeInTheDocument();
  });

  test('devrait avoir les bons liens vers les pages', () => {
    renderFooter();
    
    // Vérifier les URLs des liens
    expect(screen.getByText('Calendrier').closest('a')).toHaveAttribute('href', '/calendrier');
    expect(screen.getByText('Activités').closest('a')).toHaveAttribute('href', '/activites');
    expect(screen.getByText('Recettes').closest('a')).toHaveAttribute('href', '/recettes');
  });

  test('devrait afficher les icônes avec les bons attributs alt', () => {
    renderFooter();
    
    // Vérifier que les images sont présentes avec les bons attributs alt
    expect(screen.getByAltText('Calendrier')).toBeInTheDocument();
    expect(screen.getByAltText('Activité')).toBeInTheDocument();
    expect(screen.getByAltText('Recettes')).toBeInTheDocument();
  });

  test('devrait avoir la classe CSS footer-fin', () => {
    renderFooter();
    
    // Vérifier que le footer a la bonne classe CSS
    expect(screen.getByRole('contentinfo')).toHaveClass('footer-fin');
  });
}); 