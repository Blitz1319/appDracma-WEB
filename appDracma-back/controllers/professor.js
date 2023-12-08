const Professor = require('../models/professor');

exports.getProfessores = async (req, res) => {
  console.log('Entrou na rota getProfessores');

  const id = req.params.id;
  const email = req.query.email; // Retrieve email from query parameters

  try {
    if (id) {
      const professorById = await Professor.findOne({ id: id });

      if (!professorById) {
        res.status(422).json({ message: 'Professor não encontrado!' });
        return;
      }

      res.status(200).json(professorById);
    } else if (email) {
      const professorByEmail = await Professor.findOne({ email: email });

      if (!professorByEmail) {
        res.status(422).json({ message: 'Professor não encontrado!' });
        return;
      }

      res.status(200).json(professorByEmail);
    } else {
      const professores = await Professor.find();
      console.log('Professores encontrados:', professores);
      res.status(200).json(professores);
    }
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
};


exports.updateProfessor = async (req, res) => {
  const id = req.params.id;
  const { nome, senha, email } = req.body;

  const professor = {
    nome,
    senha,
    email
  };

  try {
    const updatedProfessor = await Professor.updateOne({ id: id }, professor);

    if (updatedProfessor.matchedCount === 0) {
      res.status(422).json({ message: 'Professor não encontrado!' });
      return;
    }

    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfessor = async (req, res) => {
  const id = req.params.id;

  const professor = await Professor.findOne({ id: id });

  if (!professor) {
    res.status(422).json({ message: 'Professor não encontrado!' });
    return;
  }

  try {
    await Professor.deleteOne({ id: id });

    res.status(200).json({ message: 'Professor removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfessor = async (req, res) => {
  const { id, nome, senha, email } = req.body;

  const professor = new Professor({
    id,
    nome,
    senha,
    email,
  });

  try {
    await professor.save();
    res.status(201).json({ message: 'Professor inserido no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfessorByEmail = async (req, res) => {
  const { nome, senha, email } = req.body;

  // Verifica se o email já está cadastrado
  const existingProfessor = await Professor.findOne({ email });

  if (existingProfessor) {
    return res.status(422).json({ message: 'Já existe um professor com esse email!' });
  }

  const professor = new Professor({
    nome,
    senha,
    email,
  });

  try {
    await professor.save();
    res.status(201).json({ message: 'Professor inserido no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfessorByName = async (req, res) => {
  const nome = req.params.nome;

  try {
    const professorByName = await Professor.findOne({ nome: nome });

    if (!professorByName) {
      res.status(422).json({ message: 'Professor não encontrado!' });
      return;
    }

    res.status(200).json(professorByName);
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: error.message });
  }
};