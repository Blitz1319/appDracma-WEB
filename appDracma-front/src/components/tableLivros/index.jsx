import React from 'react';

const LivrosTable = ({ livros, onRemoverLivro, onEditarLivro }) => {
  // Ordenar os livros por ID
  const livrosOrdenados = livros.slice().sort((a, b) => a.id - b.id);

  return (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full bg-white shadow-md rounded-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-center text-gray-600">ID</th>
            <th className="px-4 py-2 text-center text-gray-600">Título</th>
            <th className="px-4 py-2 text-center text-gray-600">Valor</th>
            <th className="px-4 py-2 text-center text-gray-600">Ações</th>
          </tr>
        </thead>
        <tbody>
          {livrosOrdenados.map((livro, index) => (
            <tr key={index} className='text-center hover:bg-gray-100'>
              <td className="px-4 py-2 text-gray-800">{livro.id}</td>
              <td className="px-4 py-2 text-gray-800">{livro.nome}</td>
              <td className="px-4 py-2 text-gray-800">{livro.valor}</td>
              <td className="px-4 py-2 flex items-center space-x-2 justify-around">
                <button
                  className="text-blue-500 hover:underline focus:outline-none"
                  onClick={() => onEditarLivro(livro)}
                >
                  Editar
                </button>
                <button
                  className="text-red-500 hover:underline focus:outline-none"
                  onClick={() => onRemoverLivro(livro.id)}
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

export default LivrosTable;
