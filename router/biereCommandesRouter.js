const express = require('express');
const biereCommandesController = require('../controller/bieresCommandesController');
const { createOrDeleteBiereCommandeRules } = require('../validators/biereCommandeValidator');
const router = express.Router();


// router.get('/', biereCommandesController.getAll);
router.post('/:commande_id/biere/:biere_id', createOrDeleteBiereCommandeRules, biereCommandesController.create);
router.delete('/:commande_id/biere/:biere_id', createOrDeleteBiereCommandeRules, biereCommandesController.delete);

module.exports = router;
