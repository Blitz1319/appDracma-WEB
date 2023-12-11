import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import Logo from "./../../assets/logoimg.png";

const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart())

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

      dispatch(signInSuccess(data))
      navigate('/home');
      console.log("Usuário com email e senha correta")

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
            <label htmlFor="id" className="block text-sm font-medium text-white p-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-sm font-medium text-white p-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
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
