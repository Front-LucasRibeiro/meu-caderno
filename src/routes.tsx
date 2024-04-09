import { Route, Routes } from 'react-router-dom';
import ListaCadernos from './components/ListaCadernos';
import Pagina404 from './pages/Pagina404';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<ListaCadernos />} />
      <Route path="*" element={<Pagina404 />} />
    </Routes>
  )
}

export default Router;
