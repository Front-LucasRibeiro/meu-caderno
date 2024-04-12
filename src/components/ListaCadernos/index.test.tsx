import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ListaCadernos from './index';

describe('Lista Cadernos Component', () => {
  test('deve renderizar a lista de cadernos caso tenha algum caderno cadastrado', () => {
    render(
      <BrowserRouter>
        <ListaCadernos cadernos={
          [{
            nome: "ReactJS",
            page: "/reactjs",
            cor: "bg-orange-500",
            conteudo: "conteudo",
          }]
        } />
      </BrowserRouter>
    )
    const listaCadernosElem = screen.getByTestId('listaCadernos');
    expect(listaCadernosElem).toBeInTheDocument();
  })

  test('deve informação uma mensagem caso não tenha nenhum caderno cadastrado', () => {
    render(
      <BrowserRouter>
        <ListaCadernos cadernos={[]} />
      </BrowserRouter>
    )
    const infoCadernos = screen.getByTestId('infoCadernos');
    expect(infoCadernos).toBeInTheDocument();
  })
})