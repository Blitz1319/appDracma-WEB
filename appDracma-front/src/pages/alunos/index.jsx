import { useState, useEffect } from 'react';
import AlunoForm from '../../components/alunosForm';
import AlunosTable from '../../components/tabAlunos';
import AlunoForm1 from '../../components/alunosForm1';
import Sidebar from '../../components/sideBar';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);

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

  const editarAluno = (aluno) => {
    setAlunoSelecionado(aluno);
  };

  const atualizarAluno = async (alunoAtualizado) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/alunos/${alunoAtualizado.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pontos: alunoAtualizado.pontos,
        }),
      });
      setAlunoSelecionado(null);
      // Atualizar apenas o aluno modificado na lista local
      setAlunos((prevAlunos) =>
        prevAlunos.map((aluno) =>
          aluno.id === alunoAtualizado.id ? alunoAtualizado : aluno
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error.message);
    }
  };
  

  const removerAluno = async (id) => {
    try {
      await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/alunos/${id}`, {
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
      <div className="container mx-auto p-4 text-center flex flex-col gap-5">
        <h1 className="text-2xl font-bold mb-4">Lista de Alunos</h1>
        <AlunosTable
          alunos={alunos}
          editarAluno={editarAluno}
          removerAluno={removerAluno}
        />
        <AlunoForm1
          alunoSelecionado={alunoSelecionado}
          onAtualizarAluno={atualizarAluno}
        />
        <AlunoForm />
      </div>
    </div>
  );
};

export default AlunosPage;
