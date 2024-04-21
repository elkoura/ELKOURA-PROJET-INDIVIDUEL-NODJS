const express = require("express");
const biereCommandesController = require("../controller/bieresCommandesController");
const { createOrDeleteValidationRules } = require("../validators/biereCommandeValidator");
const router = express.Router();

// using just the index route:
router.post("/", createOrDeleteValidationRules(), biereCommandesController.create);
router.delete("/", createOrDeleteValidationRules(), biereCommandesController.create);

// using url params:
router.post("/commande/:commande_id/biere/:biere_id", biereCommandesController.create);
router.delete("/commande/:commande_id/biere/:biere_id", biereCommandesController.delete);

module.exports = router;
