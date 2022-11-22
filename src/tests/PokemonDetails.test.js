import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o PokemonDetails e...', () => {
  const pokemonIdRoute = '/pokemon/25';
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pokemonIdRoute);
    });
    const pikachuName = screen.getByRole('heading', {
      name: /Pikachu Details/,
    });
    const pikachuSummaryHeading = screen.getByRole('heading', {
      name: /Summary/,
    });
    const pikachuLocationHeading = screen.getByRole('heading', {
      name: /Locations of Pikachu/,
    });
    const pikachuSummaryText = screen.getByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./);
    expect(pikachuName).toBeInTheDocument();
    expect(pikachuSummaryHeading).toBeInTheDocument();
    expect(pikachuSummaryText).toBeInTheDocument();
    expect(pikachuLocationHeading).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pokemonIdRoute);
    });
    const pikachuLocation = screen.getAllByRole('img');
    expect(pikachuLocation[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pikachuLocation[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push(pokemonIdRoute);
    });
    const favoriteLabel = screen.getByLabelText(/Pokémon favoritado?/);
    expect(favoriteLabel).toBeInTheDocument();
  });
});
