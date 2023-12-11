// Ranking.js
import Sidebar from '../../components/sideBar';
import RankingTable from '../../components/rankingTable';

const Ranking = () => {
  const rankingData = [];

  return (
    <div className="flex">
      <Sidebar />
      <div className="container p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Tabela de Ranking</h1>
        <RankingTable data={rankingData} />
      </div>
    </div>
  );
};

export default Ranking;
