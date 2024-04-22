const sequelize = require("sequelize");
const db = require("../config/database");
const BiereCommande = require("./biereCommandes");

const Commande = db.define("commande", {
    name: {
        type: sequelize.STRING
    },
    prix: {
        type: sequelize.FLOAT,
        validate: {
            min: 0
        }
    },
    bars_id: {
        type: sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "bars"
        }
        // onDelete: "cascade"
    },
    date: {
        type: sequelize.DATE,
        validate: {
            isDate: true
        }
    },
    status: {
        type: sequelize.STRING
    } //2 vals: (en cours, terminé)
});

Commande.hasMany(BiereCommande, {
    foreignKey: "commande_id",
    onDelete: "cascade"
});

module.exports = Commande;
