import { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sideBar';

const LeituraCodigoBarrasPage = () => {
  const [alunoData, setAlunoData] = useState(null); // Estado para armazenar os dados do aluno
  const [resultadoLeitura, setResultadoLeitura] = useState('');
  const inputCodigoBarrasRef = useRef(null);

  useEffect(() => {
    // Quando a página carregar, ativamos o foco no input
    if (inputCodigoBarrasRef.current) {
      inputCodigoBarrasRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    // Atualizamos o estado com o valor do input
    setResultadoLeitura(event.target.value);
  };

  const obterAlunoPorCodigoDeBarras = async () => {
    // Extrair o ID do código de barras (supondo que os 5 primeiros caracteres representam o ID)
    const idDoAluno = resultadoLeitura.slice(0, 5);

    try {
      const response = await fetch(`https://dracma-app-854p-nerigleston.vercel.app/livros/${idDoAluno}`);
      const data = await response.json();
      setAlunoData(data); // Armazenar os dados do aluno no estado
    } catch (error) {
      console.error('Erro ao obter dados do aluno:', error);
    }
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className="container p-4 items-center text-center">
        <h1 className="text-2xl font-bold mb-4">Leitura de Código de Barras</h1>
        <input
          ref={inputCodigoBarrasRef}
          type="text"
          placeholder="Código de Barras"
          value={resultadoLeitura}
          onChange={handleInputChange}
          className="p-2 border border-gray-300"
        />
        <div className="mt-4">
          <button onClick={obterAlunoPorCodigoDeBarras} className="px-4 py-2 bg-red-500 text-white">
            Obter Dados do Aluno
          </button>
        </div>
        {alunoData && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">{alunoData.nome}</h2>
            <p>Email: {alunoData.email}</p>
            <p>Pontos: {alunoData.pontos}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeituraCodigoBarrasPage;
