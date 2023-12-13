
import RankingTable from '../../components/rankingTable';
import Navbar from '../../components/sideBar';

const Ranking = () => {
  const rankingData = [];

  return (
    <div className="">
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 flex justify-center">Tabela de Ranking</h1>
        <RankingTable data={rankingData} />
      </div>
    </div>
  );
};

export default Ranking;