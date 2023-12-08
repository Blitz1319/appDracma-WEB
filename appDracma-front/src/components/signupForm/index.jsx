import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [id, idChange] = useState("");
    const [nome, nomeChange] = useState("");
    const [senha, senhaChange] = useState("");
    const [email, emailChange] = useState("");

    const navigate = useNavigate();

    const IsValidate = () => {
        let isProceed = true;
        let errorMessage = 'Por favor, insira um valor em ';

        if (id === null || id === '') {
            isProceed = false;
            errorMessage += ' Nome de usuário';
        }
        if (nome === null || nome === '') {
            isProceed = false;
            errorMessage += ' Nome completo';
        }
        if (senha === null || senha === '') {
            isProceed = false;
            errorMessage += ' Senha';
        }
        if (email === null || email === '') {
            isProceed = false;
            errorMessage += ' Email';
        }

        if (!isProceed) {
            console.log(errorMessage);
        } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                isProceed = false;
                console.log('Por favor, insira um email válido');
            }
        }
        return isProceed;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let regObj = { id, nome, senha, email };

        if (IsValidate()) {
            fetch("http://localhost:3000/professores", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regObj)
            })
                .then(() => {
                    console.log('Registrado com sucesso.');
                    navigate('/login');
                })

                .catch((err) => {
                    console.log('Falha: ' + err.message);
                });
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="id" className="block text-sm font-medium text-gray-600">
                            Nome de Usuário <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="id"
                            type="text"
                            value={id}
                            onChange={(e) => idChange(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    {/* ... Repeat the above structure for other input fields */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => emailChange(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Registrar
                        </button>
                        <Link to={'/'} className="btn btn-danger">Fechar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
