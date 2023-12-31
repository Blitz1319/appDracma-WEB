const Aluno = require('../models/alunos');

// Get all alunos or a specific aluno by ID
exports.getAlunos = async (req, res) => {
  const id = req.params.id;

  try {
    if (id) {
      const aluno = await Aluno.findOne({ id: id });

      if (!aluno) {
        res.status(422).json({ message: 'Aluno não encontrado!' });
        return;
      }

      res.status(200).json(aluno);
    } else {
      const alunos = await Aluno.find();
      res.status(200).json(alunos);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing aluno by ID
exports.updateAluno = async (req, res) => {
  const id = req.params.id;

  const { nome, senha, email, pontos } = req.body;

  const aluno = {
    nome,
    senha,
    email,
    pontos
  };

  try {
    const updatedAluno = await Aluno.updateOne({ id: id }, aluno);

    if (updatedAluno.matchedCount === 0) {
      res.status(422).json({ message: 'Aluno não encontrado!' });
      return;
    }

    res.status(200).json(aluno);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an existing aluno by ID
exports.deleteAluno = async (req, res) => {
  const id = req.params.id;

  const aluno = await Aluno.findOne({ id: id });

  if (!aluno) {
    res.status(422).json({ message: 'Aluno não encontrado!' });
    return;
  }

  try {
    await Aluno.deleteOne({ id: id });

    res.status(200).json({ message: 'Aluno removido com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new aluno
exports.createAluno = async (req, res) => {
  const { id, nome, senha, email, pontos } = req.body;

  // Verifica se os campos obrigatórios estão presentes e não são vazios
  if (!id || !nome || !senha || !email) {
    res.status(400).json({ message: 'Campos obrigatórios não preenchidos: id, nome, senha e email são necessários.' });
    return;
  }

  const aluno = new Aluno({
    id,
    nome,
    senha,
    email,
    pontos
  });

  try {
    await aluno.save();
    res.status(201).json({ message: 'Aluno inserido no sistema com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login route for students
exports.loginAluno = async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Find the student by email
    const aluno = await Aluno.findOne({ email: email });

    // Check if the student exists
    if (!aluno) {
      res.status(422).json({ message: 'Aluno não encontrado!' });
      return;
    }

    // Check if the password is correct
    if (aluno.senha !== senha) {
      res.status(401).json({ message: 'Senha incorreta!' });
      return;
    }

    // If everything is correct, return a success message or student details
    res.status(200).json({ message: 'Login bem-sucedido!', aluno });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { email, novaSenha, confirmarSenha } = req.body;

  try {
    // Encontrar o aluno pelo email
    const aluno = await Aluno.findOne({ email: email });

    // Verificar se o aluno existe
    if (!aluno) {
      res.status(422).json({ message: 'Aluno não encontrado!' });
      return;
    }

    // Verificar se as senhas nova e confirmar são iguais
    if (novaSenha !== confirmarSenha) {
      res.status(400).json({ message: 'As senhas não coincidem!' });
      return;
    }

    // Atualizar a senha do aluno
    aluno.senha = novaSenha;
    await aluno.save();

    res.status(200).json({ message: 'Senha alterada com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};