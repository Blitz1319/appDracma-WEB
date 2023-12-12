import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInFailure, signInStart, signInSuccess } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from './../authContext/index'; // Importe o hook useAuth
import Logo from './../../assets/logoimg.png';

const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const { login } = useAuth(); // Use o hook useAuth para acessar o contexto
  const { loading } = ((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());

      const res = await fetch('https://scaisbcaisbcapiucbcapucspasc31231hp.vercel.app/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data));
        alert(data.message || 'Algo deu errado!');
        return;
      }

      dispatch(signInSuccess(data));
      login(); // Chame a função de login do contexto
      navigate('/home');
    } catch (error) {
      dispatch(signInFailure(error));
      alert('Algo deu errado!');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen text-center bg-red-950">
      <div className="bg-black p-8 rounded shadow-md w-96 flex flex-col items-center">
        <img className='' src={Logo} height={150} width={150} alt="Logo" />
        <form onSubmit={handleSubmit} >
          <div className="mb-4">
            <input
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-center"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md text-center"
            />
          </div>
          <div>
            <button
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              {loading ? 'Carregando...' : 'Entrar'}
            </button>
          </div>
        </form>
        <div>
          {/* <Link to="/sign-up">
            <span className="text-blue-500">Cadastre-se</span>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
