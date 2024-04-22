const express = require("express");
const router = express.Router();
const commandeController = require("../controller/commandesController");

const createValidationRules = require("../validators/commandeValidator").createValidationRules;
const updateValidationRules = require("../validators/commandeValidator").updateValidationRules;
const deleteValidation = require("../validators/commandeValidator").deleteValidation;

router.post("/bars/:id_bar/commandes", createValidationRules(), commandeController.store); //ajouter une commande a un bar

router.put("/commandes/:id_commande", updateValidationRules(), commandeController.update); //modifier une commande d'un bar

router.get("/commandes/:id", commandeController.details); //detail d'une commande d'un bar

router.get("/bars/:id_bar/commandes", commandeController.index); //liste des commandes d'un bar

router.delete("/commandes/:id_commande", deleteValidation(), commandeController.delete); //supprimer une commande d'un bar

module.exports = router;
