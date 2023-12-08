import { useState, useEffect } from 'react';
import LivrosTable from '../../components/tableLivros';
import LivroForm from '../../components/formLivros';
import Sidebar from '../../components/sideBar';

const LivrosPage = () => {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState(null);

  // Função para carregar os livros do backend
  const carregarLivros = async () => {
    try {
      const response = await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/livros`);
      const data = await response.json();
      setLivros(data);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    }
  };

  useEffect(() => {
    carregarLivros();
  }, []);

  const adicionarLivro = async (novoLivro) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/livros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoLivro),
      });
      carregarLivros();
    } catch (error) {
      console.error('Erro ao adicionar livro:', error);
    }
  };

  const removerLivro = async (id) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/livros/${id}`, {
        method: 'DELETE',
      });
      carregarLivros();
    } catch (error) {
      console.error('Erro ao remover livro:', error);
    }
  };

  const editarLivro = (livro) => {
    setLivroSelecionado(livro);
  };

  const atualizarLivro = async (livroAtualizado) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/livros/${livroAtualizado.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: livroAtualizado.nome,
          valor: livroAtualizado.valor,
        }),
      });
      setLivroSelecionado(null);
      carregarLivros();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };
  
  

  return (
    <div className='flex'>
      <Sidebar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Lista de Livros</h1>
        <LivrosTable
          livros={livros}
          onRemoverLivro={removerLivro}
          onEditarLivro={editarLivro}
        />
        <LivroForm
          onAdicionarLivro={adicionarLivro}
          livroSelecionado={livroSelecionado}
          onAtualizarLivro={atualizarLivro}
        />
      </div>
    </div>
  );
};

export default LivrosPage;
