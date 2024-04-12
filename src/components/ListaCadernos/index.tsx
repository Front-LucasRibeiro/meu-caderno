import React from 'react';
import s from './style.module.scss';
import { useNavigate } from 'react-router-dom';

// Define a interface Caderno
interface Caderno {
  nome: string;
  page: string;
  cor: string; 
  conteudo: string;
} 

// Defina o tipo das props para o componente ListaCadernos
interface ListaCadernosProps {
  cadernos: Caderno[]; // aceitando uma lista de cadernos
}

const ListaCadernos: React.FC<ListaCadernosProps> = ({cadernos}) => {
  const navigate = useNavigate();
  
  const verCaderno = (page: string) => {
    navigate(page)  
  }
  
  return (
    <section className={`${s.listaCadernos} p-4 flex flex-col items-center`}>
      <div className="listaCadernos__field flex">
        <label htmlFor="buscarCadernos">Buscar cadernos:</label>
        <input type="text" id="buscarCadernos" name="buscarCadernos" placeholder="Digite para buscar..." />
      </div>

      {
        cadernos && cadernos.length > 0 ? (
          <ul className={`${s.listaCadernos__lista} flex items-center`} data-testid="listaCadernos">
            {cadernos.map((item, index) => (
              <li
                key={index}
                className={`${item.cor} rounded overflow-hidden shadow-lg px-6 text-white text-center flex items-center justify-center`}
                onClick={() => verCaderno(`/caderno${item.page}`)}
              >
                  {item.nome}  
              </li>
            ))}
          </ul>
        ) : (

          <div className={`${s.listaCadernos__info} flex flex-col justify-center`}>
            <p className={`${s.listaCadernos__info__text} flex justify-center h-100%`} data-testid="infoCadernos">Não há cadernos cadastrados</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-lighter py-2 px-4 rounded mt-6">Criar caderno</button>
          </div>
        )
      }

    </section>
  );
};

export default ListaCadernos;
