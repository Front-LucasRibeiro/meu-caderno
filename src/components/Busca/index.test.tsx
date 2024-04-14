/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BuscaCadernos from './index';
import { Caderno } from '../Shared/ICaderno';

describe('Busca Cadernos Component', () => {
  test('deve retornar uma lista com o elemento filtrado', () => {
    // Mock da função de atualização da lista
    const updateListaMock = jest.fn();

    const cadernos: Caderno[] = [ // Defina a lista de cadernos com o tipo Caderno[]
      { id: "1", nome: 'Caderno CSS', page: "/css", cor: "bg-orange-500", conteudo: "conteudo css" },
      { id: "2", nome: 'Caderno HTML', page: "/html", cor: "bg-blue-500", conteudo: "conteudo html" },
    ];

    // Renderiza o componente
    const { getByLabelText } = render(
      <BrowserRouter>
        <BuscaCadernos cadernos={cadernos} updateLista={updateListaMock} />
      </BrowserRouter>
    );

    // Simula uma pesquisa que retorna resultados
    const input = getByLabelText('Buscar cadernos:');
    fireEvent.change(input, { target: { value: 'Caderno CSS' } });

    // Verifica se a função de atualização da lista foi chamada com a lista filtrada 
    const cadernosFiltrados = cadernos.filter(caderno => caderno.nome.toLowerCase().includes('caderno css'));
    expect(updateListaMock).toHaveBeenCalledWith(cadernosFiltrados);
  })

  test('deve retornar a lista inicial com todos cadernos, caso não atenda o filter da busca', () => {
    // Mock da função de atualização da lista
    const updateListaMock = jest.fn();

    const cadernos: Caderno[] = [ // Defina a lista de cadernos com o tipo Caderno[]
      { id: "1", nome: 'Caderno CSS', page: "/css", cor: "bg-orange-500", conteudo: "conteudo css" },
      { id: "2", nome: 'Caderno HTML', page: "/html", cor: "bg-blue-500", conteudo: "conteudo html" },
    ];

    // Renderiza o componente
    const { getByLabelText } = render(
      <BrowserRouter>
        <BuscaCadernos cadernos={cadernos} updateLista={updateListaMock} />
      </BrowserRouter>
    );

    // Simula uma pesquisa que não retorna resultados 
    const input = getByLabelText('Buscar cadernos:');
    fireEvent.change(input, { target: { value: 'Caderno test' } });

    const cadernosFiltrados = cadernos.filter(caderno => caderno.nome.toLowerCase().includes('caderno test'));


    // Verifica se a função de atualização da lista foi chamada com uma lista vazia, caso sim retorna a lista inicial
    if (cadernosFiltrados.length === 0) {
      expect(updateListaMock).toHaveBeenCalledWith(cadernos);
    }
  })
})
