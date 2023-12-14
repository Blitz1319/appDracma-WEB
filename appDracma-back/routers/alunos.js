const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/alunos');

// Your route definitions
router.patch('/change-password', alunoController.changePassword);
router.get('/:id?', alunoController.getAlunos);
router.post('/', alunoController.createAluno);
router.post('/login', alunoController.loginAluno);
router.patch('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;
