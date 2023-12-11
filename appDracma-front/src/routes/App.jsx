import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/login/index.jsx';
import Home from '../pages/home/index.jsx';
import AlunosPage from '../pages/alunos/index.jsx';
import LeituraCodigoBarrasPage from '../pages/vendas/index.jsx';
import LivrosPage from '../pages/livros/index.jsx';
// import SigUp from '../components/signupForm/index.jsx';
import PrivateRoutes from './privateRoutes.jsx';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<AlunosPage />} path='/alunos' exact />
          <Route element={<LeituraCodigoBarrasPage />} path='/vendas' exact />
          <Route element={<LivrosPage />} path='/livros' exact />
          <Route element={< Home />} path='/home' exact />
        </Route>
        <Route>
          <Route exact path="/" element={<Login />} />
          {/* <Route exact path="/sign-up" element={<SigUp />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
