import { useState } from 'react';

const AlunoForm = () => {
  const [nome, setNome] = useState('');
  const [id, setId] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const cadastrarAluno = async (alunoData) => {
    try {
      const response = await fetch("https://6mvpsoj7gikhrtrk.vercel.app/alunos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alunoData),
      });

      if (response.status === 201) {
        setSuccessMessage('Aluno cadastrado com sucesso!');
        setErrorMessage('');
      } else {
        const errorText = await response.text();
        throw new Error(`Erro ao cadastrar aluno: ${errorText}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage('');
    }
  };

  const handleCadastro = async () => {
    try {
      if (nome.trim() === '' || id.trim() === '' || senha.trim() === '' || email.trim() === '') {
        setErrorMessage('Por favor, preencha todos os campos');
        return;
      }

      const novoAluno = {
        id,
        nome,
        email,
        senha,
        pontos: 0,
      };

      await cadastrarAluno(novoAluno);

      // Limpar campos de input após o registro bem-sucedido
      setNome('');
      setId('');
      setEmail('');
      setSenha('');
    } catch (error) {
      setErrorMessage(`Erro ao cadastrar aluno: ${error.message}`);
    }
  };

  return (
    <div className="mb-4 flex justify-center flex-col items-center gap-3">
      <h2 className="text-xl font-bold mb-2">Cadastrar Novo Aluno</h2>
      <div className="flex flex-col gap-5 sm:flex-row sm:gap-10">
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="ID do Aluno"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="mb-2 px-4 py-2 border border-gray-300 text-center"
          />
          <input
            type="text"
            placeholder="Nome do Aluno"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mb-2 px-4 py-2 border border-gray-300 text-center"
          />
        </div>
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Email do Aluno"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 px-4 py-2 border border-gray-300 text-center"
          />
          <input
            type="password"
            placeholder="Senha do Aluno"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="mb-2 px-4 py-2 border border-gray-300 text-center"
          />
        </div>
      </div>
      <button onClick={handleCadastro} className="px-4 py-2 bg-red-500 text-white">
        Cadastrar
      </button>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  );
}

export default AlunoForm;
