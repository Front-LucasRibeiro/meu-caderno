import { Caderno } from '../Shared/ICaderno';
import s from './styles.module.scss'

// Defina o tipo das props para o componente ListaCadernos
interface ListaCadernosProps {
  cadernos: Caderno[]; // aceitando uma lista de cadernos
  updateLista: (newValue:Caderno[] ) => void;
}


const BuscaCadernos: React.FC<ListaCadernosProps> = ({cadernos, updateLista}) => {
  
  const pesquisarCadernos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valorPesquisado = e.target.value.toLowerCase();
    const cadernosFiltrados = cadernos.filter(caderno => caderno.nome.toLowerCase().includes(valorPesquisado))

    if (cadernosFiltrados.length > 0) {
      updateLista(cadernosFiltrados);
    }else{
      updateLista(cadernos)    
    }     
  }


  return (
    <div className="listaCadernos__field flex flex-col items-center mb-10">
      <label htmlFor="buscarCadernos" className="font-bold mb-2">Buscar cadernos:</label>
      <input
        type="text"  
        id="buscarCadernos"
        name="buscarCadernos"
        placeholder="Digite para buscar..."
        className={`px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 ${s.fieldSearch}`}
        onChange={(e) => pesquisarCadernos(e)}
      />
    </div>
  )
}

export default BuscaCadernos;