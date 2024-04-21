const sequelize = require("sequelize");
const db = require("../config/database");
const Biere = require("./Bieres");
const Commande = require("./Commandes");

const BiereCommande = db.define("biere_commandes", {
  biere_id: {
    type: sequelize.INTEGER,
    references: {
      model: Biere
    }
  },
  commande_id: {
    type: sequelize.INTEGER,
    references: {
      model: Commande
    }
  }
});

module.exports = BiereCommande;
