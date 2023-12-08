import { useEffect, useState } from 'react';

const RankingTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua pela URL da sua API que retorna dados de nome e pontos
        const response = await fetch('http://localhost:3000/alunos' || "https://dracma-app-854p-nerigleston.vercel.app/alunos");
        const jsonData = await response.json();

        // Ordenar os dados com base na pontuação em ordem decrescente
        const sortedData = jsonData.sort((a, b) => b.pontos - a.pontos);

        setData(sortedData);
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Posição</th>
              <th className="border border-gray-300 px-4 py-2">Jogador</th>
              <th className="border border-gray-300 px-4 py-2">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{item.nome}</td>
                <td className="border border-gray-300 px-4 py-2">{item.pontos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RankingTable;
