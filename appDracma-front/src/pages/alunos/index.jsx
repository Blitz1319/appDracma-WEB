import { useState, useEffect } from 'react';
import AlunoForm from '../../components/alunosForm';
import AlunosTable from '../../components/tabAlunos';
import Sidebar from '../../components/sideBar';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://6mvpsoj7gikhrtrk.vercel.app/alunos");
        const data = await response.json();
        setAlunos(data);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  const adicionarPontos = async (id) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pontos: 1 }), // Incremento de 1 ponto
      });
      setAlunos((prevAlunos) =>
        prevAlunos.map((aluno) =>
          aluno.id === id ? { ...aluno, pontos: aluno.pontos + 1 } : aluno
        )
      );
    } catch (error) {
      console.error('Erro ao adicionar pontos:', error);
    }
  };
  
  const removerPontos = async (id) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pontos: -1 }), // Decremento de 1 ponto
      });
      setAlunos((prevAlunos) =>
        prevAlunos.map((aluno) =>
          aluno.id === id
            ? { ...aluno, pontos: Math.max(0, aluno.pontos - 1) }
            : aluno
        )
      );
    } catch (error) {
      console.error('Erro ao remover pontos:', error);
    }
  };
  

  const removerAluno = async (id) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/${id}`, {
        method: 'DELETE',
      });
      setAlunos((prevAlunos) => prevAlunos.filter((aluno) => aluno.id !== id));
    } catch (error) {
      console.error('Erro ao remover aluno:', error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Lista de Alunos</h1>
        <AlunosTable alunos={alunos} adicionarPontos={adicionarPontos} removerPontos={removerPontos} removerAluno={removerAluno} />
        <AlunoForm />
      </div>
    </div>
  );
};

export default AlunosPage;
