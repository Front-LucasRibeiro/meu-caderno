import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Caderno as ICaderno } from '../Shared/ICaderno';
import s from './styles.module.scss';

const Caderno = () => {
  const [content,setContent] = useState<string>("")
  const [nomeCaderno,setNomeCaderno] = useState<string>("")
  // puxar o conteudo do caderno com o id informado
  const { id } = useParams();

  const getListaCadernos = () => {
    fetch("http://localhost:3001/cadernos")
    .then(resp => resp.json())
    .then((data: ICaderno[]) =>{
      const cadernoProcurado = data.filter(caderno => caderno.nome.toLowerCase() === id)
      setContent(cadernoProcurado[0].conteudo)
      setNomeCaderno(cadernoProcurado[0].nome)
    })
  }

  useEffect(() => {
    getListaCadernos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <section className='p-4 flex flex-col items-center'>
      <h2 className='font-bold mb-5'>{nomeCaderno}</h2>
      <textarea value={content} className={`${s.conteudo} rounded p-4 mb-5`}></textarea>
    </section>
  )
}

export default Caderno;