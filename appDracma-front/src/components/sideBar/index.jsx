import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session storage or perform any necessary logout logic
    sessionStorage.removeItem('username'); // Example: clear username from session storage
    sessionStorage.removeItem('userrole'); // Example: clear user role from session storage

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="bg-red-800 h-screen w-1/6 p-8 flex text-center justify-center">
      <ul className="text-white">
        <li className="mb-4">
          <Link to="/home">Home</Link>
        </li>
        <li className='mb-4'>
          <Link to="/alunos">Cadastrar Aluno</Link>
        </li>
        <li className='mb-4'>
          <Link to="/vendas">Vendas</Link>
        </li>
        <li className='mb-4'>
          <Link to="/livros">Livaria</Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-white hover:underline focus:outline-none"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
