const express = require('express');
const biereCommandesController = require('../controller/bieresCommandesController');
const router = express.Router();

router.get('/', biereCommandesController.getAll);
router.post('/:commande_id/biere/:biere_id', biereCommandesController.create);
router.delete('/:commande_id/biere/:biere_id', biereCommandesController.delete);

module.exports = router;
