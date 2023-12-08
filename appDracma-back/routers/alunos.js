const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunos');

// Your route definitions
router.get('/:id?', alunoController.getAlunos);
router.post('/', alunoController.createAluno); // Adicionando a rota POST
router.patch('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;
