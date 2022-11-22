import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o App e...', () => {
  test('Testa se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoriteLink).toBeInTheDocument();
  });
  test('Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });
  test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémon/i,
    });
    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });
  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/raphael');
    });
    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
