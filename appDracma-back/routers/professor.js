const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professor');

router.get('/', professorController.getProfessores);
router.post('/', professorController.createProfessor);
router.get('/:id', professorController.getProfessores);
router.get('/:email', professorController.getProfessores);
router.patch('/:id', professorController.updateProfessor);
router.delete('/:id', professorController.deleteProfessor);
router.get('/:nome', professorController.getProfessorByName); // Updated route for getting by name

module.exports = router;
