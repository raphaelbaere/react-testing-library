import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o Pokedex e...', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon:', () => {
    renderWithRouter(<App />);
    const encounteredEl = screen.getByRole('heading', {
      name: /Encountered Pokémon/,
    });
    expect(encounteredEl).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado:', () => {
    renderWithRouter(<App />);
    const buttonNextEl = screen.getByRole('button', {
      name: /Próximo Pokémon/,
    });
    userEvent.click(buttonNextEl);
    const charmanderText = screen.getByText(/Charmander/);
    expect(charmanderText).toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', {
      name: /All/,
    });
    const getAllFilterButtons = screen.getAllByTestId('pokemon-type-button');
    expect(getAllFilterButtons[0]).toHaveTextContent('Electric');
    expect(getAllFilterButtons[1]).toHaveTextContent('Fire');
    expect(getAllFilterButtons[2]).toHaveTextContent('Bug');
    expect(getAllFilterButtons[3]).toHaveTextContent('Poison');
    expect(getAllFilterButtons[4]).toHaveTextContent('Psychic');
    expect(getAllFilterButtons[5]).toHaveTextContent('Normal');
    expect(getAllFilterButtons[6]).toHaveTextContent('Dragon');
    expect(allButton).not.toHaveAttribute('data-testid', 'pokemon-type-button');
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const noFilterButton = screen.getByRole('button', {
      name: /All/,
    });
    expect(noFilterButton).toBeInTheDocument();
    userEvent.click(noFilterButton);
  });
});
