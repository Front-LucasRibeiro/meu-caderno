import { render, screen } from '@testing-library/react'; //import lib para teste do react
import Header from './index';

describe('Header Component', () => {
  test('deve renderizar uma lista de navegação', () => {
    // renderiza o componente header para o teste 
    render(<Header title="Meu Título" isAuthenticated={false} />);

    // encontrando uma lista ul ou ol com data-name navegacao
    const listNavElement = screen.getByTestId('navegacao');

    // fazendo asserção 
    expect(listNavElement).toBeInTheDocument();
  })
});
