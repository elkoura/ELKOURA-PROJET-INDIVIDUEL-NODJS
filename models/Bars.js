const sequelize = require("sequelize");
const db = require("../config/database");
const Commande = require("./Commandes");
const Biere = require("./Bieres");

const Bars = db.define("bars", {
    name: {
        type: sequelize.STRING,
        unique: true
    },
    adresse: {
        type: sequelize.STRING
    },
    tel: {
        type: sequelize.STRING
    },
    email: {
        type: sequelize.STRING
    },
    description: {
        type: sequelize.TEXT
    }
});

Bars.hasMany(Commande, {
    foreignKey: "bars_id",
    onDelete: "cascade"
});

Bars.hasMany(Biere, {
    foreignKey: "bars_id",
    onDelete: "cascade"
});

module.exports = Bars;
