const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  id: String,
  nome: String,
  valor: Number,
});

const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;
