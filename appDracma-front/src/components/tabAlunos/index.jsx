const AlunosTable = ({ alunos, editarAluno, removerAluno }) => {
  const alunosOrdenados = alunos.slice().sort((a, b) => a.id - b.id);

  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-gray-600">ID</th>
            <th className="px-4 py-2 text-center text-gray-600">Nome</th>
            <th className="px-4 py-2 text-center text-gray-600">Email</th>
            <th className="px-4 py-2 text-center text-gray-600">Pontos</th>
            <th className="px-4 py-2 text-center text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunosOrdenados.map((aluno) => (
            <tr key={aluno.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 text-gray-800">{aluno.id}</td>
              <td className="px-4 py-2 text-gray-800">{aluno.nome}</td>
              <td className="px-4 py-2 text-gray-800">{aluno.email}</td>
              <td className="px-4 py-2 text-gray-800">{aluno.pontos}</td>
              <td className="px-4 py-2 flex items-center space-x-2 justify-around">
                <button
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={() => editarAluno(aluno)}
                >
                  Editar
                </button>
                <button
                  className="text-red-500 hover:underline focus:outline-none"
                  onClick={() => removerAluno(aluno.id)}
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlunosTable;
