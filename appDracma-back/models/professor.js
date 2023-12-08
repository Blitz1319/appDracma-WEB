const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
  id: String,
  nome: String,
  senha: String,
  email: String,
});

const Professor = mongoose.model('Professor', professorSchema);

module.exports = Professor;
