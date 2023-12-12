import { useEffect, useState } from 'react';

const RankingTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Substitua pela URL da sua API que retorna dados de nome e pontos
        const response = await fetch("https://6mvpsoj7gikhrtrk.vercel.app/alunos");
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
    <div className="overflow-x-auto mb-4 h-screen">
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden ">
        <thead className="bg-gray-200 ">
          <tr className=''>
            <th className="px-4 py-2 text-center text-gray-600">Posição</th>
            <th className="px-4 py-2 text-center text-gray-600">Jogador</th>
            <th className="px-4 py-2 text-center text-gray-600">Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className = 'text-center hover:bg-gray-100'>
              <td className="px-4 py-2 text-gray-800">{index + 1}</td>
              <td className="px-4 py-2 text-gray-800">{item.nome}</td>
              <td className="px-4 py-2 text-gray-800">{item.pontos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
