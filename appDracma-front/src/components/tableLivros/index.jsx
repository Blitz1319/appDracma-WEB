const LivrosTable = ({ livros, onRemoverLivro, onEditarLivro }) => {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Título</th>
            <th className="border border-gray-300 px-4 py-2">Valor</th>
            <th className="border border-gray-300 px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td className="border border-gray-300 px-4 py-2">{livro.id}</td>
              <td className="border border-gray-300 px-4 py-2">{livro.nome}</td>
              <td className="border border-gray-300 px-4 py-2">{livro.valor}</td>
              <td className="border border-gray-300 px-4 py-2 flex justify-around">
                <button onClick={() => onEditarLivro(livro)}>Editar</button>
                <button onClick={() => onRemoverLivro(livro.id)}>Remover</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LivrosTable;
