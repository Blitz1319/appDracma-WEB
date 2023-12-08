const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  id: String,
  nome: String,
  senha: String,
  email: String,
  pontos: Number,
});

const Aluno = mongoose.model('Aluno', alunoSchema);

module.exports = Aluno;
