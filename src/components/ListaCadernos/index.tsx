/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BuscaCadernos from '../Busca';
import { Caderno } from '../Shared/ICaderno';


// Defina o tipo das props para o componente ListaCadernos
interface ListaCadernosProps {
  cadernos: Caderno[]; // aceitando uma lista de cadernos
}

const ListaCadernos: React.FC<ListaCadernosProps> = ({cadernos}) => {
  const navigate = useNavigate();
  const [cadernosLista, setCadernosLista] = useState<Caderno[]>([]);
  
  const verCaderno = ( page: string) => {
    navigate(page)  
  }

  // Função para atualizar o estado do componente pai com base no componente filho buscaCadernos
  const updateLista = (newValue: Caderno[]) => {
    setCadernosLista(newValue);
  };

  useEffect(() => {
    setCadernosLista(cadernos);
  }, [cadernos]); // Atualiza quando a prop cadernos muda

  
  return (
    <section className={`${s.listaCadernos} p-4 flex flex-col items-center`}>
      <BuscaCadernos cadernos={cadernos} updateLista={updateLista} />

      {
        cadernosLista && cadernosLista.length > 0 ? (
          <ul className={`${s.listaCadernos__lista} flex items-center`} data-testid="listaCadernos">
            {cadernosLista.map((item, index) => (
              <li
                key={index}
                className={`${item.cor} rounded overflow-hidden shadow-lg px-6 text-white text-center flex items-center justify-center`}
                onClick={() => verCaderno(`/caderno${item.page}/${item.id}`)}
              >
                  {item.nome}  
              </li>
            ))}
          </ul>
        ) : (

          <div className={`${s.listaCadernos__info} flex flex-col justify-center`}>
            <p className={`${s.listaCadernos__info__text} flex justify-center h-100%`} data-testid="infoCadernos">Não há cadernos cadastrados</p>
            <Link to="/cadastrar-caderno" className="text-center bg-blue-500 hover:bg-blue-700 text-white font-lighter py-2 px-4 rounded mt-6">Criar caderno</Link>
          </div>
        )
      }

    </section>
  );
};

export default ListaCadernos;
