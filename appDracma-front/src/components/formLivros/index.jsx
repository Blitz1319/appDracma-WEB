import { useState, useEffect } from 'react';

const LivroForm = ({ onAdicionarLivro, livroSelecionado, onAtualizarLivro }) => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    if (livroSelecionado) {
      setId(livroSelecionado.id);
      setNome(livroSelecionado.nome);
      setValor(livroSelecionado.valor);
    }
  }, [livroSelecionado]);

  const handleAdicionarLivro = () => {
    const novoLivro = {
      id,
      nome,
      valor,
    };

    onAdicionarLivro(novoLivro);
    setId('');
    setNome('');
    setValor('');
  };

  const handleAtualizarLivro = () => {
    const livroAtualizado = {
      id: livroSelecionado.id,
      nome,
      valor,
    };

    onAtualizarLivro(livroAtualizado);
    setId('');
    setNome('');
    setValor('');
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2 text-center">Adicionar/Editar Livro</h2>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300"
        />
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300"
        />
        <input
          type="text"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="mr-2 px-4 py-2 border border-gray-300"
        />
        {livroSelecionado ? (
          <button onClick={handleAtualizarLivro} className="px-4 py-2 bg-green-500 text-white">
            Atualizar
          </button>
        ) : (
          <button onClick={handleAdicionarLivro} className="px-4 py-2 bg-red-500 text-white">
            Adicionar
          </button>
        )}
      </div>
    </div>
  );
};

export default LivroForm;
