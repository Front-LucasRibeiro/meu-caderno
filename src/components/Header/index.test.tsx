import React from 'react';
import { render, screen } from '@testing-library/react'; //import lib para teste do react
import Header from './index';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
  test('deve renderizar uma lista de navegação', () => {
    // renderiza o componente header para o teste 

    render(
      <BrowserRouter>
        <Header title="Meu Título" isAuthenticated={true} />
      </BrowserRouter>
    );

    // encontrando uma lista ul ou ol com data-name navegacao
    const listNavElement = screen.getByTestId('navegacao');

    // fazendo asserção 
    expect(listNavElement).toBeInTheDocument();
  })

  test('deve renderizar o logo do app', () => {
    // renderiza o componente header para o teste 
    render(
      <BrowserRouter>
        <Header title="Meu Título" isAuthenticated={false} />
      </BrowserRouter>
    );

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  test('deve renderizar uma lista com até 5 cadernos fixados no menu, caso esteja logado', () => {
    // renderiza o componente header para o teste 
    render(
      <BrowserRouter>
        <Header title="Meu Título" isAuthenticated={true} />
      </BrowserRouter>
    );

    const list = screen.getByTestId('navegacao');
    expect(list).toBeInTheDocument();

    // Verifica se o número de elementos <li> é no máximo 5
    // eslint-disable-next-line testing-library/no-node-access
    const listItemElements = list.querySelectorAll('li');
    expect(listItemElements.length).toBeLessThanOrEqual(5);
  });

  test('deve renderizar o nome do usuário, e link cadastrar caderno se estiver logado', () => {
    render(
      <BrowserRouter>
        <Header title="Meu Título" isAuthenticated={true} />
      </BrowserRouter>
    );

    const linkCadastrar = screen.getByTestId('linkCadastrar'); 
    expect(linkCadastrar).toBeInTheDocument();
    expect(linkCadastrar).toHaveTextContent("Cadastrar caderno");

    const nameUser = screen.getByTestId('nameUser');
    expect(nameUser).toBeInTheDocument();
    expect(nameUser).toHaveTextContent(/Olá.+/i); // verifica se contém o texto Olá em qualquer lugar da string
  });

  test('deve renderizar o link de Login, caso o usuário não esteja logado', () => {
    // renderiza o componente header para o teste 
    render(
      <BrowserRouter>
        <Header title="Meu Título" isAuthenticated={false} /> 
      </BrowserRouter>
    );

    const linkLogin = screen.getByTestId('linkLogin');
    expect(linkLogin).toBeInTheDocument();
    expect(linkLogin).toHaveTextContent('Login');
  });
});
