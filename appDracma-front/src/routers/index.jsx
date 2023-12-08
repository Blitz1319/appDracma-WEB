import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";
import Login from "../pages/login/index.jsx";
import Home from "../pages/home/index.jsx";
import AlunosPage from "../pages/alunos/index.jsx";
import LeituraCodigoBarrasPage from "../pages/vendas/index.jsx";
import LivrosPage from "../pages/livros/index.jsx";
import SignupPage from "../components/signupForm/index.jsx";


export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={< Home />} />
        <Route exact path="/alunos" element={<AlunosPage />} />
        <Route exact path="/vendas" element={<LeituraCodigoBarrasPage />} />
        <Route exact path="/livros" element={<LivrosPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}