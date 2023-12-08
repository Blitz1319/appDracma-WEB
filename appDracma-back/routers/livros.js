const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livros');

router.post('/', livroController.createLivro);
router.get('/:id?', livroController.getLivros);
router.patch('/:id', livroController.updateLivro);
router.delete('/:id', livroController.deleteLivro);

module.exports = router;
