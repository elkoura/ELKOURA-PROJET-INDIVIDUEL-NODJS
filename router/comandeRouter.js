const express = require("express")
const router = express.Router()
const commandeController = require("../controller/commandesController")
/**
 * 
  POST /bars/:id_bar/commandes => Ajouter une commande à un bars
  PUT /commandes/:id_commande => Modifier une commande d'un bars
  DELETE /commandes/:id_commande => Supprimer une commande d'un bars
  GET /bars/:id_bar/commandes => Liste des commandes d'un bars
  GET /commandes/:id => Détail d'une commande d'un bars
 */
router.get("/", commandeController.index);//liste des commandes d'un bar

router.get("/edit/:id", commandeController.edit);//detail d'une commande d'un bar

router.post("/bars/:id_bar/commandes", commandeController.store);//ajouter une commande a un bar

router.put("/commandes/:bars_id", commandeController.update);//modifier une commande d'un bar

router.delete("/delete/:id", );//supprimer une commande d'un bar