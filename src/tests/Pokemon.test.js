import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o Pokemon e...', () => {
  const pokemonIdRoute = '/pokemon/25';
  test('Teste se é renderizado um card com as informações de determinado Pokémon:', () => {
    renderWithRouter(<App />);
    const pokemonNameEl = screen.getByText(/Pikachu/);
    const pokemonTypeEl = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/);
    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonNameEl).toBeInTheDocument();
    expect(pokemonTypeEl).toHaveTextContent(/Electric/);
    expect(pokemonWeight).toBeInTheDocument();
  });
  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/,
    });
    expect(detailsLink).toHaveAttribute('href', pokemonIdRoute);
  });
  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', {
      name: /More details/,
    });
    expect(detailsLink).toHaveAttribute('href', pokemonIdRoute);
    userEvent.click(detailsLink);
    expect(history.location.pathname).toBe(pokemonIdRoute);
  });
  test('Teste se existe um ícone de estrela nos Pokémon favoritados:', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/25');
    });
    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    act(() => {
      history.push('/');
    });
    const favoriteImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
