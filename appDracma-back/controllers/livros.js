const Livro = require('../models/livros');

// Get all livros or a specific livro by ID
exports.getLivros = async (req, res) => {
  const id = req.params.id;

  try {
    if (id) {
      const livro = await Livro.findOne({ id: id });

      if (!livro) {
        res.status(422).json({ message: 'Livro não encontrado!' });
        return;
      }

      res.status(200).json(livro);
    } else {
      const livros = await Livro.find();
      res.status(200).json(livros);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing livro by ID
exports.updateLivro = async (req, res) => {
  const id = req.params.id;

  const { nome, valor } = req.body;

  const livro = {
    nome,
    valor,
  };

  try {
    const updatedLivro = await Livro.updateOne({ id: id }, livro);

    if (updatedLivro.matchedCount === 0) {
      res.status(422).json({ message: 'Livro não encontrado!' });
      return;
    }

    res.status(200).json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an existing livro by ID
exports.deleteLivro = async (req, res) => {
  const id = req.params.id;

  const livro = await Livro.findOne({ id: id });

  if (!livro) {
    res.status(422).json({ message: 'Livro não encontrado!' });
    return;
  }

  try {
    await Livro.deleteOne({ id: id });

    res.status(200).json({ message: 'Livro removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new livro
exports.createLivro = async (req, res) => {
  const { id, nome, valor } = req.body;

  const livro = new Livro({
    id,
    nome,
    valor,
  });

  try {
    await livro.save();
    res.status(201).json({ message: 'Livro inserido no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
