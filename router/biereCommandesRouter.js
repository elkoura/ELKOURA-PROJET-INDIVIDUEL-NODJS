const express = require("express");
const biereCommandesController = require("../controller/bieresCommandesController");
const {
  createOrDeleteValidationRules,
} = require("../validators/biereCommandeValidator");
const errorValidator = require("../validators/errorValidator");
const router = express.Router();

// using just the index route:
const validationRules = [...createOrDeleteValidationRules, errorValidator];
router.post("/", validationRules, biereCommandesController.create);
router.delete("/", validationRules, biereCommandesController.delete);

// using url params: not using checks here cuz lazy
router.post(
  "/commande/:commande_id/biere/:biere_id",
  biereCommandesController.create,
);
router.delete(
  "/commande/:commande_id/biere/:biere_id",
  biereCommandesController.delete,
);

module.exports = router;
