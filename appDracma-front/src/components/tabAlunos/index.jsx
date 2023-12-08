const AlunosTable = ({ alunos, adicionarPontos, removerPontos }) => {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nome</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Pontos</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td className="border border-gray-300 px-4 py-2">{aluno.id}</td>
              <td className="border border-gray-300 px-4 py-2">{aluno.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{aluno.email}</td>
              <td className="border border-gray-300 px-4 py-2">{aluno.pontos}</td>
              <td className="border border-gray-300 px-4 py-2 flex gap-5 justify-center">
                <button onClick={() => adicionarPontos(aluno.id)}>Adicionar 1 Ponto</button>
                <button onClick={() => removerPontos(aluno.id)}>Remover 1 Ponto</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlunosTable;
