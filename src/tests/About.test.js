import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Renderiza o About e...', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    const headingAboutEl = screen.getByRole('heading', {
      name: /About Pokédex/,
    });
    expect(history.location.pathname).toBe('/about');
    expect(headingAboutEl).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    const firstPAboutEl = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/);
    const secondPAboutEl = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/);
    expect(history.location.pathname).toBe('/about');
    expect(firstPAboutEl).toBeInTheDocument();
    expect(secondPAboutEl).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    const { history } = renderWithRouter(<About />);
    act(() => {
      history.push('/about');
    });
    expect(history.location.pathname).toBe('/about');
    const imageAboutEl = screen.getByRole('img');
    expect(imageAboutEl).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
