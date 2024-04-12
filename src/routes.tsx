import { Route, Routes } from 'react-router-dom';
import ListaCadernos from './components/ListaCadernos';
import Pagina404 from './pages/Pagina404';
import Caderno from './components/Caderno';
import { useEffect, useState } from 'react';


function Router() {
  const [lista,setLista] = useState([])

  const getListaCadernos = () => {
    fetch("http://localhost:3001/cadernos/")
    .then(resp => resp.json())
    .then(data =>{
      setLista(data)
    })
  }

  useEffect(() => {
    getListaCadernos();
  }, [])

  return (
    <Routes>
      <Route path="/" element={<ListaCadernos cadernos={lista} />} />
      <Route path="/caderno/:id" element={<Caderno />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  )
}

export default Router;
