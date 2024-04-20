const sequelize = require("sequelize");
const db = require("../config/database");
const bieres = require("./Bieres");
const comamndes = require("./Commandes");


const BiereCommande = db.define('biere_commandes', {
    biere_id: {
        type: sequelize.INTEGER,
        references: {
            model: bieres,
        },
    },
    commande_id: {
        type: sequelize.INTEGER,
        references: {
            model: comamndes
        }
    },
});

module.exports = BiereCommande;