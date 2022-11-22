import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Renderiza o NotFound e...', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('./raphael');
    });
    const notFoundFavorite = screen.getByRole('heading', {
      name: /Page requested not found/,
    });
    expect(notFoundFavorite).toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('./raphael');
    });
    const notFoundImage = screen.getByRole('img');
    expect(notFoundImage).toBeInTheDocument();
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
