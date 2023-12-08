import { useState } from "react";
import Logo from "./../../assets/logoimg.png";
// import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  
  return (
    <div className="flex items-center justify-center h-screen text-center bg-red-950">
      <div className="bg-black p-8 rounded shadow-md w-96 flex flex-col items-center">
        <img className='' src={Logo} height={150} width={150} alt="Logo" />
        <form >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white p-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="senha" className="block text-sm font-medium text-white p-1">
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Login
            </button>
          </div>
          {/* <Link className="btn btn-success" to={'/signup'}>New User</Link> */}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
