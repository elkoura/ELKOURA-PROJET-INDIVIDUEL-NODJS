const express = require("express");
const router = express.Router();
const commandeController = require("../controller/commandesController");

const createValidationRules = require("../validators/commandeValidator").createValidationRules;
const updateValidationRules = require("../validators/commandeValidator").updateValidationRules;
const commandIdValidation = require("../validators/commandeValidator").commandIdValidation;

router.post("/bars/:id_bar/commandes", createValidationRules(), commandeController.store); //ajouter une commande a un bar

router.put("/:id_commande", updateValidationRules(), commandeController.update); //modifier une commande d'un bar

router.get("/:id", commandeController.details); //detail d'une commande d'un bar

router.get("/bars/:id_bar/commandes", commandeController.index); //liste des commandes d'un bar

router.delete("/:id_commande", commandIdValidation(), commandeController.delete); //supprimer une commande d'un bar

router.get("/details/:id_commande", commandIdValidation(), commandeController.pdf); //renvoie un pdf de la commande
module.exports = router;
