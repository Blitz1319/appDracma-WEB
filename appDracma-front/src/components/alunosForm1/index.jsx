import { useState, useEffect } from 'react';

const AlunoForm = ({ onAdicionarAluno, alunoSelecionado, onAtualizarAluno }) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [pontos, setPontos] = useState('');

  useEffect(() => {
    if (alunoSelecionado) {
      setId(alunoSelecionado.id);
      setNome(alunoSelecionado.nome);
      setEmail(alunoSelecionado.email);
      setPontos(alunoSelecionado.pontos);
    }
  }, [alunoSelecionado]);

  const handleAdicionarAluno = () => {
    const novoAluno = {
      id,
      nome,
      email,
      pontos,
    };

    onAdicionarAluno(novoAluno);
    setId('');
    setNome('');
    setEmail('');
    setPontos('');
  };

  const handleAtualizarAluno = () => {
    const alunoAtualizado = {
      id: alunoSelecionado.id,
      nome,
      email,
      pontos,
    };

    onAtualizarAluno(alunoAtualizado);
    setId('');
    setNome('');
    setEmail('');
    setPontos('');
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Editar Pontuação</h2>
      <div className="flex justify-center flex-col items-center gap-5">
        <p>Nome: {nome}</p>
        <input
          type="text"
          placeholder="Pontos"
          value={pontos}
          onChange={(e) => setPontos(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300"
        />
        {alunoSelecionado ? (
          <button onClick={handleAtualizarAluno} className="px-4 py-2 bg-green-500 text-white">
            Atualizar
          </button>
        ) : (
          <button onClick={handleAdicionarAluno} className="px-4 py-2 bg-red-500 text-white">
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
};

export default AlunoForm;
