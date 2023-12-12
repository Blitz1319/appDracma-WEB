import { useState, useRef, useEffect } from 'react';
import Sidebar from '../../components/sideBar';

const LeituraCodigoBarrasPage = () => {
  const [alunoData, setAlunoData] = useState(null);
  const [resultadoLeitura, setResultadoLeitura] = useState('');
  const inputCodigoBarrasRef = useRef(null);

  useEffect(() => {
    if (inputCodigoBarrasRef.current) {
      inputCodigoBarrasRef.current.focus();
    }
  }, []);

  const handleInputChange = (event) => {
    setResultadoLeitura(event.target.value);
  };

  const obterAlunoPorCodigoDeBarras = async () => {
    const idDoAluno = resultadoLeitura.slice(0, 5);

    try {
      const response = await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/alunos/${idDoAluno}`);
      const data = await response.json();
      setAlunoData(data);
    } catch (error) {
      console.error('Erro ao obter dados do aluno:', error);
    }
  };

  return (
    <div className="flex h-screen text-center">
      <Sidebar />

      <div className="flex-1 p-6 h-screen">
        <h1 className="text-3xl font-bold mb-6">Leitura de Código de Barras</h1>

        <div className="mb-4">
          <p className="text-gray-600">Insira o código de barras abaixo:</p>
          <input
            ref={inputCodigoBarrasRef}
            type="text"
            placeholder="Código de Barras"
            value={resultadoLeitura}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 text-center"
          />
        </div>

        <div className="mb-4">
          <button
            onClick={obterAlunoPorCodigoDeBarras}
            className="px-4 py-2 bg-red-500 text-white"
          >
            Obter Dados do Aluno
          </button>
        </div>

        {alunoData && (
          <div>
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
