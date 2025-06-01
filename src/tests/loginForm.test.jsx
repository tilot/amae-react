/* global describe, it, expect, jest, beforeEach, afterEach, global */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm/LoginForm';

// Mock de fetch global
beforeEach(() => {
  global.fetch = jest.fn();
});
afterEach(() => {
  jest.resetAllMocks();
});

describe('Formulaire de connexion', () => {
  it('affiche les champs et le bouton', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("Nom d'utilisateur ...")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe ...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent("Je m'inscris");
  });

  it('affiche une erreur si les identifiants sont invalides', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Identifiants invalides' })
    });
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur ..."), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe ...'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText(/identifiants invalides/i)).toBeInTheDocument();
    });
  });

  it('affiche un message de succès et redirige après connexion réussie', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake-token', user: { id: 1, mail: 'test@mail.com' } })
    });
    render(<LoginForm />);
    fireEvent.change(screen.getByPlaceholderText("Nom d'utilisateur ..."), { target: { value: 'test@mail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Mot de passe ...'), { target: { value: 'goodpass' } });
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText(/connexion réussie/i)).toBeInTheDocument();
    });
  });
}); 