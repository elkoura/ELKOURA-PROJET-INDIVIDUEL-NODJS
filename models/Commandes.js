const sequelize = require("sequelize");
const db = require("../config/database");

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
        },
        onDelete: "cascade"
    },
    date: {
        type: sequelize.DATE
    },
    status: {
        type: sequelize.STRING
    } //2 vals: (en cours, terminé)
});
module.exports = Commande;
