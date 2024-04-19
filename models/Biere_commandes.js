const sequelize = require("sequelize");
const db = require("../config/database");


const BiereCommande = db.define('biere_commande', {
    biere_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'Bières',
        }
    },
    commande_id: {
        type: sequelize.INTEGER,
        references: {
            model: 'Commandes'
        }
    },
});

module.exports = BiereCommande;