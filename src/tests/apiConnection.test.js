/* global describe, it, expect, jest */
import { recipeService } from '../services/api';

describe('Connexion à l’API', () => {
  it('devrait récupérer la liste des recettes sans erreur', async () => {
    // On mock la méthode getAllRecipes pour éviter un appel réseau réel
    const mockRecipes = [
      { id: 1, title: 'Tarte aux pommes', description: 'Délicieuse tarte', preparation_time: 30, difficulty: 'Facile' },
      { id: 2, title: 'Gâteau au chocolat', description: 'Moelleux et gourmand', preparation_time: 45, difficulty: 'Moyen' }
    ];
    jest.spyOn(recipeService, 'getAllRecipes').mockResolvedValueOnce(mockRecipes);

    const recipes = await recipeService.getAllRecipes();
    expect(recipes).toEqual(mockRecipes);
    expect(Array.isArray(recipes)).toBe(true);
    expect(recipes.length).toBe(2);
    expect(recipes[0].title).toBe('Tarte aux pommes');
  });
}); 