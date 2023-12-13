import { useState, useRef, useEffect } from 'react';
import Navbar from '../../components/sideBar';

const LeituraCodigoBarrasPage = () => {
  const [alunoData, setAlunoData] = useState(null);
  const [livrosDisponiveis, setLivrosDisponiveis] = useState([]);
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
    const idDoAluno = resultadoLeitura.slice(0, 13);

    try {
      const response = await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/alunos/${idDoAluno}`);
      const data = await response.json();
      setAlunoData(data);
      obterLivrosDisponiveis(data.pontos);
    } catch (error) {
      console.error('Erro ao obter dados do aluno:', error);
    }
  };

  const obterLivrosDisponiveis = async (pontosDoAluno) => {
    try {
      const response = await fetch('https://6mvpsoj7gikhrtrk.vercel.app/livros');
      const livros = await response.json();
      const livrosDisponiveisParaCompra = livros.filter(livro => livro.valor <= pontosDoAluno);
      setLivrosDisponiveis(livrosDisponiveisParaCompra);
    } catch (error) {
      console.error('Erro ao obter livros:', error);
    }
  };

  const efetuarCompra = async (livro) => {
    if (alunoData && alunoData.pontos >= livro.valor) {
      try {
        // Descontar pontos do aluno
        const pontosRestantes = alunoData.pontos - livro.valor;

        // Remover o livro do estoque (chamada à API)
        await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/livros/${livro.id}`, {
          method: 'DELETE', // ou apropriado para a sua API
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Atualizar os pontos do aluno (chamada à API)
        const response = await fetch(`https://6mvpsoj7gikhrtrk.vercel.app/alunos/${alunoData.id}`, {
          method: 'PATCH', // ou apropriado para a sua API
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pontos: pontosRestantes }),
        });

        if (response.ok) {
          // Atualizar o estado do componente com base na resposta da API
          setLivrosDisponiveis((livrosAntigos) =>
            livrosAntigos.filter((livroAtual) => livroAtual.id !== livro.id)
          );
          setAlunoData({ ...alunoData, pontos: pontosRestantes });

          console.log(`Livro "${livro.nome}" comprado!`);
        } else {
          console.error('Erro ao atualizar pontos do aluno.');
        }
      } catch (error) {
        console.error('Erro ao efetuar compra:', error);
      }
    } else {
      console.warn('Pontos insuficientes para comprar este livro.');
    }
  };

  return (
    <div className="h-screen text-center">
      <Navbar />

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

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Livros Disponíveis para Compra</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-gray-600">Livro</th>
                <th className="px-4 py-2 text-gray-600">Pontos</th>
                <th className="px-4 py-2 text-gray-600">Ação</th>
              </tr>
            </thead>
            <tbody>
              {livrosDisponiveis.map((livro) => (
                <tr key={livro.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 text-gray-800">{livro.nome}</td>
                  <td className="px-4 py-2 text-gray-800">{livro.valor}</td>
                  <td className="px-4 py-2 text-gray-800">
                    <button onClick={() => efetuarCompra(livro)}>Comprar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default LeituraCodigoBarrasPage;
