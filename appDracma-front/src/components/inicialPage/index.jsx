import Sidebar from "../sideBar";

const InicialPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">Bem-vindo à Página Inicial</h1>
        </div>
      </div>
    </div>
  );
};

export default InicialPage;