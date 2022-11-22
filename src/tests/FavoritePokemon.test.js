import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';

describe('Renderiza o Favorites e...', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos;', () => {
    const { history } = renderWithRouter(<FavoritePokemon />);
    act(() => {
      history.push('./favorites');
    });
    const notFoundFavorite = screen.getByText(/No favorite Pokémon found/);
    expect(notFoundFavorite).toBeInTheDocument();
  });
});
