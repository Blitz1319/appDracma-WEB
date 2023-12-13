import { Link } from 'react-router-dom';
import LogoutButton from '../logoutButton';

const Navbar = () => {
  return (
    <div className="bg-red-800 w-full p-7 text-white flex justify-around items-center">
      <div>
        <Link to="/home">Home</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/alunos">Cadastrar Aluno</Link>
        <Link to="/vendas">Vendas</Link>
        <Link to="/livros">Livaria</Link>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
