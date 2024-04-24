const express = require("express");
const router = express.Router();
const commandeController = require("../controller/commandesController");

const errorValidator = require("../validators/errorValidator");
const { createValidationRules, updateValidationRules, validateCommandeIdParam } = require("../validators/commandeValidator");

// basic crud
router.post("/bars/:id_bar/commandes", [...createValidationRules, errorValidator], commandeController.store);
router.put("/:id_commande", [...updateValidationRules, errorValidator], commandeController.update);
router.delete("/:id_commande", [...validateCommandeIdParam, errorValidator], commandeController.delete);
router.get("/:id", commandeController.details);

//
router.get("/bars/:id_bar/commandes", [...validateCommandeIdParam, errorValidator], commandeController.index); //liste des commandes d'un bar

//bonus
router.get("/details/:id_commande", [...validateCommandeIdParam, errorValidator], commandeController.pdf); //renvoie un pdf de la commande

module.exports = router;
