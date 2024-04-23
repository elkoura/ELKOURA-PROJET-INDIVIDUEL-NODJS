const express = require("express");
const router = express.Router();
const commandeController = require("../controller/commandesController");

const {
    createValidationRules,
    updateValidationRules,
    validateCommandeIdParam
} = require("../validators/commandeValidator");
const errorValidator = require("../validators/errorValidator");

// basic crud
router.post("/bars/:id_bar/commandes", [...createValidationRules, errorValidator], commandeController.store);
router.get("/:id", commandeController.details);
router.put("/:id_commande", [...updateValidationRules, errorValidator], commandeController.update);
router.delete("/:id_commande", validateCommandeIdParam, commandeController.delete);

//
router.get("/bars/:id_bar/commandes", commandeController.index); //liste des commandes d'un bar

//bonus
router.get("/details/:id_commande", validateCommandeIdParam, commandeController.pdf); //renvoie un pdf de la commande

module.exports = router;
