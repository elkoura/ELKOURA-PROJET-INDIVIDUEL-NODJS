const express = require("express");
const biereCommandesController = require("../controller/bieresCommandesController");
const {
  createOrDeleteValidationRules,
} = require("../validators/biereCommandeValidator");
const router = express.Router();

// router.get('/', biereCommandesController.getAll);
router.post(
  "/commande/:commande_id/biere/:biere_id",
  createOrDeleteValidationRules(),
  biereCommandesController.create
);
router.delete(
  "/commande/:commande_id/biere/:biere_id",
  createOrDeleteValidationRules(),
  biereCommandesController.delete
);

module.exports = router;
